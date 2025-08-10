export default function verifyEnv(requiredKeys = []) {
  const missing = requiredKeys.filter(k => !process.env[k]);
  if (missing.length) {
    console.error(`[env] Missing required environment variables: ${missing.join(', ')}`);
    console.error('Create a .env file in server/ with these keys. Example:\nMONGO_URI=mongodb://localhost:27017/hackathon\nJWT_SECRET=dev_secret');
    process.exit(1);
  }
}
