import { requireEnvString } from '../env';

export default {
  googleMapsApiKey: requireEnvString('GOOGLE_MAPS_API_KEY'),
  googleClientId: requireEnvString('GOOGLE_CLIENT_ID'),
  googleClientSecret: requireEnvString('GOOGLE_CLIENT_SECRET'),
  googleCalendarRefreshToken: requireEnvString('GOOGLE_CALENDAR_REFRESH_TOKEN'),
};
