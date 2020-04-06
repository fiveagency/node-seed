import firebaseApp from '../../firebase/firebase-app';
import { logger } from '../../logging';
import { resolveClientTopic, resolveGuideTopic, resolveBroadcastTopic } from './topic';

const OPTIONS = {
  priority: 'high',
};

export function createPayload(body = '', action = '') {
  const payload = {
    notification: {
      body,
      clickAction: action,
      sound: 'default',
      badge: '1',
    },
  };

  return payload;
}

export function sendToClient(clientId, payload) {
  const topic = resolveClientTopic(clientId);

  logger.info({ pushNotification: { topic, payload } }, 'Sending a notification to a client.');

  return firebaseApp.messaging().sendToTopic(topic, payload, OPTIONS);
}

export function sendToGuide(guideId, payload) {
  const topic = resolveGuideTopic(guideId);

  logger.info({ pushNotification: { topic, payload } }, 'Sending a notification to a guide.');

  return firebaseApp.messaging().sendToTopic(topic, payload, OPTIONS);
}

export function sendBroadcast(payload) {
  const topic = resolveBroadcastTopic();
  return firebaseApp.messaging().sendToTopic(topic, payload, OPTIONS);
}
