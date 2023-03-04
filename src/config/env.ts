export const env = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  apikey: process.env.REACT_APP_APIKEY,
  api: {
    emailKey: process.env.REACT_APP_EMAIL_VALIDATION_KEY,
    recaptcha: process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY,
  },
  server: process.env.REACT_APP_SERVER,
  socket: process.env.REACT_APP_SOCKET,
};
