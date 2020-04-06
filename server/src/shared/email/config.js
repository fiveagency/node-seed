import { requireEnvString } from '../../../core/env';

export default {
  mandrillApiKey: requireEnvString('MANDRILL_API_KEY'),
  mailerEmail: requireEnvString('MAILER_EMAIL'),
  supportEmail: requireEnvString('SUPPORT_EMAIL'),
  envPrefix: requireEnvString('MAILER_ENV_PREFIX', null),
};
