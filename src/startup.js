import sendEmail from "./util/NodemailerProxy";

// todo: add 'new email' event listener that sends the email using a nodemailer transporter configured for the shop associated with the email.

/**
 * 
 * @param {Object} context App context
 */
export default function onSendEmailEventProxyToNodemailer(context) {
    context.appEvents.on("sendEmail", (...args) => sendEmail(context, ...args));
}