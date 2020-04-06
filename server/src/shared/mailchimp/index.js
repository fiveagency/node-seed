import request from 'request-promise';

import config from './config';

/* eslint-disable @typescript-eslint/camelcase */

/**
 * Mailchimp uses basic access authentication. This means
 * that we need to pass a user name and a password combined with
 * a single colon. Since we don't have a user name, we pass anystring.
 * The combined value need to be base64 encoded.
 */
export function getAuthorizationHeader() {
  const passwordAndUserNameEncoded = Buffer.from(`anystring:${config.apiKey}`).toString('base64');

  return `Basic ${passwordAndUserNameEncoded}`;
}

export async function addUserToList(email, listId, mergeFields) {
  return request.post({
    url: `${config.apiUrl}/lists/${listId}/members`,
    headers: {
      Authorization: getAuthorizationHeader(),
    },
    body: {
      email_address: email,
      status: 'subscribed',
      merge_fields: mergeFields,
    },
    json: true,
  });
}
