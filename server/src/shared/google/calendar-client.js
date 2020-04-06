import { google } from 'googleapis';
import config from './config';

/* eslint-disable @typescript-eslint/camelcase */

export function createGoogleCalendarClient(refreshToken) {
  const oauth2Client = new google.auth.OAuth2(config.googleClientId, config.googleClientSecret);

  oauth2Client.setCredentials({
    refresh_token: refreshToken || config.googleCalendarRefreshToken,
  });

  return google.calendar({
    version: 'v3',
    auth: oauth2Client,
  });
}
