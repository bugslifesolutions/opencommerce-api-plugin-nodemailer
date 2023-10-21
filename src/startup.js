import sendEmail from './util/NodemailerMsalProxy';

/**
 *
 * @param {Object} context App context
 * @return {undefined}
 */
export default function onSendEmailEventProxyToNodemailer(context) {
  context.appEvents.on('sendEmail', (...args) => sendEmail(context, ...args));
}
