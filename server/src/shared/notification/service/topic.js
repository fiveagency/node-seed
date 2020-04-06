export function resolveClientTopic(clientId) {
  return `clients.${clientId}`;
}

export function resolveGuideTopic(guideId) {
  return `guides.${guideId}`;
}

export function resolveBroadcastTopic() {
  return 'broadcast';
}
