import { requireEnvString } from '../env';

export default {
  twilioAccountSid: requireEnvString('TWILIO_ACCOUNT_SID'),
  twilioAuthToken: requireEnvString('TWILIO_AUTH_TOKEN'),
  twilioPhoneNumber: requireEnvString('TWILIO_PHONE_NUMBER'),
};
