import nodemailer from 'nodemailer';
import {msalClientCredentialAuth} from './MsalCustomAuth.js';

/**
 * @name sendEmail
 * @summary Sends the provided email using the Nodemailer transport
 *  and shop's NodemailerTransportConfig
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
  // eslint-disable-next-line max-len
  const {nodemailerTransportOptions} = await context.queries.appSettings(context, shopId);
  // replicate credentials in auth.options for custom oauth2 (not Google).
  // see https://nodemailer.com/smtp/customauth/

  if (nodemailerTransportOptions.auth.method !== undefined) {
    hackForNodemailerIssue1584(nodemailerTransportOptions.auth);
    nodemailerTransportOptions.customAuth = {
      msalClientCredentialAuth,
    };
  }

  const transporter = nodemailer.createTransport(nodemailerTransportOptions);
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
 * @param {Object} auth Nodemailer auth configuration.
 * @see https://nodemailer.com/smtp/oauth2/
 */
function hackForNodemailerIssue1584(auth) {
  // see https://github.com/nodemailer/nodemailer/issues/1584
  auth.user = auth.user || 'placeholder';
  auth.pass = auth.pass || 'placeholder';
}
