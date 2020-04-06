import Twilio from 'twilio';
import config from './config';

const twilioClient = new Twilio(config.twilioAccountSid, config.twilioAuthToken);

export function sendSms(to, message) {
  return twilioClient.messages.create({
    from: config.twilioPhoneNumber,
    body: message,
    to,
  });
}
