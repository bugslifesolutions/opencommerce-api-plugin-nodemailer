import { ConfidentialClientApplication } from "@azure/msal-node";

// TODO: Handle OAUTH2 Client_Credentials flow
  //       - depends on preestablished application trust in the form of
  //         a client id and client secret
  //       - the client secret is also long lived and subject to its expiry policy upon setup of the application
  //         and is used in combination with the client id to acquire a short lived access token
  //       - The access token is short lived.
async function msalClientCredentialAuth(ctx){
    const msalConfig = { auth: ctx.auth.credentials.options };
    try {
        const cca = new ConfidentialClientApplication(msalConfig);
        const tokenRequest = {
          scopes: ['https://outlook.office365.com/.default']
        };
        const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
        ctx.auth.accessToken = tokenInfo.accessToken;
        ctx.auth.expires = tokenInfo.expiresOn;
        ctx.resolve();
    } catch {
        ctx.reject();
    }
}

module.exports = { msalClientCredentialAuth };
