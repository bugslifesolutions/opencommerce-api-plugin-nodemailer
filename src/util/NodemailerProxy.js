import nodemailer from "nodemailer";
import PlaceholderNodemailerTransportConfig from "../config.js";

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

  //todo: derive NodemailerTransportConfig from the shopId of the email job!
  const transport = nodemailer.createTransport(PlaceholderNodemailerTransportConfig);

  transport.sendMail({ to, shopId, ...otherEmailFields }, (error) => {
    if (error) {
      sendEmailFailed(job, `sending email for job failed: ${error.toString()}`);
    } else {
      sendEmailCompleted(job, `sending email job to ${to} succeeded.`);
    }
  });
}