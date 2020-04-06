import { requireEnvString } from '../../../core/env';

export default {
  apiKey: requireEnvString('MAILCHIMP_API_KEY'),
  apiUrl: requireEnvString('MAILCHIMP_API_URL'),
};
