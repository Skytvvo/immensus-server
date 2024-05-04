import process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  isPublicKey: process.env.IS_PUBLIC_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
});
