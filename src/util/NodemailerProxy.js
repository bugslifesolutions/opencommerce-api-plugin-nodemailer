import nodemailer from "nodemailer";

/**
 * @name sendEmail
 * @summary Sends the provided email using the Nodemailer transport and shop's NodemailerTransportConfig
 * @param {Object} context App context
 * @param {Object} job Current sendEmail job being processed
 * @param {Function} sendEmailCompleted Called when email was successfully sent
 * @param {Function} sendEmailFailed Called on error
 * @returns {undefined} Calls one of the callbacks with a return
 */
export default async function sendEmail(context, { job, sendEmailCompleted, sendEmailFailed }) {
  const { to, shopId, ...otherEmailFields } = job.data;
  const { nodemailerTransportOptions } = await context.queries.appSettings(context, shopId);

  const transport = nodemailer.createTransport(nodemailerTransportOptions);

  transport.sendMail({ to, shopId, ...otherEmailFields }, (error) => {
    if (error) {
      sendEmailFailed(job, `sending email for job failed: ${error.toString()}`);
    } else {
      sendEmailCompleted(job, `sending email job to ${to} succeeded.`);
    }
  });
}