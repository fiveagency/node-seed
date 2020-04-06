import _ from 'lodash';
import Promise from 'bluebird';
import mandrill from 'mandrill-api/mandrill';
import config from './config';

/* eslint-disable @typescript-eslint/camelcase */

const mandrillClient = new mandrill.Mandrill(config.mandrillApiKey);

function transformMergeVars(variables) {
  return _.map(variables, (value, key) => ({
    name: key,
    content: value,
  }));
}

function validateResult(result) {
  if (_.some(result, (r) => _.includes(['rejected', 'invalid'], r.status))) {
    const error = _.first(result);
    const status = _.get(error, 'status');
    let message = `Mandrill status:${status} for the email:${_.get(error, 'email')}`;

    if (status === 'rejected') {
      message += `, reason:${_.get(error, 'reject_reason')}`;
    }

    throw new Error(message);
  }
}

/**
 * Sends email with template content
 * @param {string} from Sender email address
 * @param {string} to Receiver email address
 * @param {string} templateName Name of mandrill mail template
 * @param {Object} templateVars Variables used in template
 * @param {string} replyTo ReplyTo email address (optional)
 * @returns {Promise} Result from mandrill
 */
export async function sendTemplateMail(from, to, templateName, templateVars, replyTo, attachments) {
  templateVars.envPrefix = config.envPrefix ? `[${config.envPrefix}] ` : '';
  const message = {
    from_email: from,
    to: [{ email: to }],
    global_merge_vars: transformMergeVars(templateVars),
    merge_language: 'handlebars',
  };

  if (attachments) message.attachments = attachments;

  if (replyTo) {
    message.headers = { 'Reply-To': replyTo };
  }

  const emailOptions = {
    template_name: templateName,
    template_content: [],
    message,
    async: false,
  };

  const result = await new Promise((resolve, reject) =>
    mandrillClient.messages.sendTemplate(emailOptions, resolve, reject),
  );
  validateResult(result);
  return result;
}

/**
 * Sends email with custom content
 * @param {string} from Sender email address
 * @param {string} to Receiver email address
 * @param {string} subject Mail subject
 * @param {string} textContent Mail text content
 * @param {string} htmlContent Mail HTML content
 * @param {string} replyTo ReplyTo email address (optional)
 * @returns {Promise} Result from mandrill
 */
export async function sendMail(from, to, subject, textContent, htmlContent, replyTo) {
  const transformedSubject = config.envPrefix ? `[${config.envPrefix}} ${subject}` : subject;
  const message = {
    from_email: from,
    to: [{ email: to }],
    subject: transformedSubject,
    text: textContent,
    html: htmlContent,
    merge_language: 'handlebars',
  };

  if (replyTo) {
    message.headers = { 'Reply-To': replyTo };
  }

  const emailOptions = {
    message,
    async: false,
  };

  const result = await new Promise((resolve, reject) => mandrillClient.messages.send(emailOptions, resolve, reject));
  validateResult(result);
  return result;
}
