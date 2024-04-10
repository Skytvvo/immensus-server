export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  isPublicKey: process.env.IS_PUBLIC_KEY,
});
