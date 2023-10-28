// todo: replace with shop specific Nodemailer Transport Config.
const Oauth2NodemailerTransportOptions = {
  pool: true,
  host: 'smtp.office365.com',
  port: 587,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'KubeCommercePlus',
    clientId: 'a6e5896b-4222-4a4f-b38c-4d6a8ef8c98f',
    clientSecret: 'AVv8Q~zkAnUrYif-_AaypzmFLPopw5HICWKVobq3',
    refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
    accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
    expires: 1484314697598,
  },
};

export default [Oauth2NodemailerTransportOptions];
