import {ConfidentialClientApplication} from '@azure/msal-node';

/**
 * Calls ctx.resolve upon successful authentication or ctx.reject otherwise
 * @param {Object} ctx The nodemailer authentication context
 * @see https://nodemailer.com/smtp/customauth/
 */
async function msalClientCredentialAuth(ctx) {
  const msalConfig = {auth: ctx.auth.credentials.options};
  try {
    const cca = new ConfidentialClientApplication(msalConfig);
    const tokenRequest = {
      scopes: ['https://outlook.office365.com/.default'],
    };
    const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
    ctx.auth.accessToken = tokenInfo.accessToken;
    ctx.auth.expires = tokenInfo.expiresOn;
    ctx.resolve();
  } catch {
    ctx.reject();
  }
}

module.exports = {msalClientCredentialAuth};
