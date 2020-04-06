import { requireEnvString } from '../env';

let privateKey = requireEnvString('FIREBASE_PRIVATE_KEY', '');
if (!privateKey.length) {
  privateKey = new Buffer(requireEnvString('FIREBASE_PRIVATE_KEY_BASE64'), 'base64').toString('ascii');
}

export default {
  projectId: requireEnvString('FIREBASE_PROJECT_ID'),
  clientEmail: requireEnvString('FIREBASE_CLIENT_EMAIL'),
  privateKey,
};
