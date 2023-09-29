// todo: replace with shop specific Nodemailer Transport Config.
const Oauth2NodemailerTransportOptions = {
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "user@example.com",
    clientId: "000000000000-xxx0.apps.googleusercontent.com",
    clientSecret: "XxxxxXXxX0xxxxxxxx0XXxX0",
    refreshToken: "1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx",
    accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
    expires: 1484314697598
  }
};

export default [Oauth2NodemailerTransportOptions];
