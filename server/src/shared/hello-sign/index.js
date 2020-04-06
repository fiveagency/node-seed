import _ from 'lodash';
import crypto from 'crypto';
import hellosignSdk from 'hellosign-sdk';
import config from './config';
import { ReminderAlreadySentForCurrentHourError } from './errors';

/* eslint-disable @typescript-eslint/camelcase */
const hellosign = hellosignSdk({ key: config.hellosignApiKey });

/**
 * Creates a signature request which can be embedded for signing.
 * @param {string} fullName Signer's full name
 * @param {string} email Signer's email address
 * @param {string} templateId Id of a template to use as a signing document
 */
export async function createEmbeddedSignatureRequest(fullName, email, templateId) {
  const options = {
    test_mode: config.hellosignTestMode,
    clientId: config.hellosignClientId,
    template_id: templateId,
    signers: [
      {
        email_address: email,
        name: fullName,
        role: config.hellosignTemplateSignerRole,
      },
    ],
  };

  const response = await hellosign.signatureRequest.createEmbeddedWithTemplate(options);
  const signatureRequestId = _.get(response, 'signature_request.signature_request_id');

  return signatureRequestId;
}

export async function getSignatureRequest(requestId) {
  const response = await hellosign.signatureRequest.get(requestId);
  const signatureRequest = _.get(response, 'signature_request');

  return signatureRequest;
}

export async function isSignatureRequestComplete(requestId) {
  const signatureRequest = await getSignatureRequest(requestId);

  return signatureRequest.is_complete;
}

export async function getSignUrl(requestId, signatureIndex) {
  const signatureRequest = await getSignatureRequest(requestId);
  const signature = signatureRequest.signatures[signatureIndex];
  const signatureId = signature.signature_id;

  const response = await hellosign.embedded.getSignUrl(signatureId);

  return response.embedded.sign_url;
}

/**
 * Sends a signature request email reminder. This functionality can only be
 * used for signature requests which are not embedded-i.e., those which are
 * meant to be signed on HelloSign.com
 * @param {string} requestId Signature request id
 * @param {string} email Signer's email address
 */
export async function sendRequestReminder(requestId, email) {
  try {
    await hellosign.signatureRequest.remind(requestId, { email_address: email });
  } catch (error) {
    // HelloSign allows only one reminder to client per hour.
    if (error.type === 'forbidden') {
      throw new ReminderAlreadySentForCurrentHourError();
    }
  }
}

export function isHelloSignEventValid(event) {
  try {
    const eventTime = _.get(event, 'event.event_time');
    const eventType = _.get(event, 'event.event_type');
    const eventHash = _.get(event, 'event.event_hash');

    const computedHash = crypto
      .createHmac('sha256', config.hellosignApiKey)
      .update(eventTime + eventType)
      .digest('hex')
      .toString();

    return computedHash === eventHash;
  } catch (_) {
    return false;
  }
}

export async function fetchSignedDocumentAsPDF(requestId) {
  const responseStream = await hellosign.signatureRequest.download(requestId, { file_type: 'pdf' });

  const buffers = [];
  const data = await new Promise((resolve, reject) => {
    responseStream.on('data', (buffer) => {
      buffers.push(buffer);
    });

    responseStream.on('end', () => {
      const buffer = Buffer.concat(buffers);
      resolve(buffer);
    });

    responseStream.on('error', (error) => {
      reject(error);
    });
  });

  return data;
}
