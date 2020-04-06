import admin from 'firebase-admin';
import firebaseConfig from './config';

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseConfig.projectId,
    clientEmail: firebaseConfig.clientEmail,
    privateKey: firebaseConfig.privateKey,
  }),
});

export default app;
