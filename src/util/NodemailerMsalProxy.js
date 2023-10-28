import {ConfidentialClientApplication} from '@azure/msal-node';
import nodemailer from 'nodemailer';

const userTokens = {};
/**
 * @name sendEmail
 * @summary Sends the provided email using the Nodemailer transport and
 * shop's NodemailerTransportConfig.
 * @param {Object} context App context
 * @param {Object} job Current sendEmail job being processed
 * @param {Function} sendEmailCompleted Called when email was successfully sent
 * @param {Function} sendEmailFailed Called on error
 * @return {undefined} Calls one of the callbacks with a return
 */
export default async function sendEmail(context, {
  job,
  sendEmailCompleted,
  sendEmailFailed,
}) {
  const {to, shopId, ...otherEmailFields} = job.data;
  const {nodemailerTransportOptions} =
    await context.queries.appSettings(context, shopId);

  const transporter = nodemailer.createTransport(nodemailerTransportOptions);
  transporter.set('oauth2_provision_cb', async (user, renew, callback) => {
    let userToken = userTokens[user];
    if (renew || !userToken) {
      userToken = await getNewToken(nodemailerTransportOptions);
      userTokens[user] = userToken;
    }

    if (!userToken) {
      return callback(new Error('Unknown user'));
    } else {
      return callback(null, userToken.accessToken);
    }
  });
  // TODO:
  await transporter.sendMail({to, shopId, ...otherEmailFields}, (error) => {
    if (error) {
      sendEmailFailed(job, `sending email for job failed: ${error.toString()}`);
    } else {
      sendEmailCompleted(job, `sending email job to ${to} succeeded.`);
    }
  });
}

/**
 *
 * @param {Object} nodemailerTransportOptions Nodemailer transport options
 * @return {Promise} TokenInfo
 */
async function getNewToken(nodemailerTransportOptions) {
  const msalConfig = {auth: nodemailerTransportOptions.auth};
  const cca = new ConfidentialClientApplication(msalConfig);
  return cca.acquireTokenByClientCredential({scopes: ['https://outlook.office365.com/.default']});
}
