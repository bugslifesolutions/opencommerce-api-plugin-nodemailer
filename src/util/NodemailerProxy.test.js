import { ConfidentialClientApplication } from "@azure/msal-node";
import sendEmail from "./NodemailerProxy";

const tenantId = "5cbfe33a-4b4f-4dd1-ab00-5d79bb3c5865";
const mockAppSettings = {
  nodemailerTransportOptions: {
    pool: true,
    host: "smtp.office365.com",
    requireTLS: true,
    port: 587,
    logger: true,
    debug: true, // include SMTP traffic in the logs
    auth: {
      type: "custom",
      method: "msalClientCredentialAuth",
      user: "weborders-noreply@applianceshack.com",
      options: {
        clientId: "a6e5896b-4222-4a4f-b38c-4d6a8ef8c98f", // your app client ID
        clientSecret: process.env.nodemailerClientSecret, // your app client secret
        authority: `https://login.microsoftonline.com/${tenantId}` // your tenant ID
      }
    },
  }
};

test("calls queries.appSettings and returns the appSettings", done => {
  // This is silly 
  ; (async () => {
    const appSettings = jest.fn().mockName("appSettings").mockReturnValue(Promise.resolve(mockAppSettings));

    const tenantId = "5cbfe33a-4b4f-4dd1-ab00-5d79bb3c5865";
    const result = await sendEmail(
      { queries: { appSettings } },
      {
        job: {
          data: {
            shopId: 1,
            from: mockAppSettings.nodemailerTransportOptions.auth.user,
            to: "test_opencommerce-opencommerce-api-plugin-nodemailer@bugslifesolutions.com",
            subject: 'Test email via opencommerce-opencommerce-api-plugin-nodemailer NodemailerProxy.test.js',
            text: 'Hello world',
            html: '<p>Hello world</p>'
          }
        },
        sendEmailCompleted: (res) => { console.log(res); done(); },
        sendEmailFailed: (res) => { console.log(res); done(); }
      }
    );

    expect(appSettings).toHaveBeenCalled();
  })()
}, 100000)