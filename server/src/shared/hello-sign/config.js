import { requireEnvString } from '../env';

function isHelloSignInTestMode() {
  const helloSignMode = requireEnvString('HELLOSIGN_MODE');

  if (helloSignMode === 'production') {
    return false;
  } else if (helloSignMode === 'test') {
    return true;
  }

  throw new Error('Unsupported value for HelloSign mode env variable!');
}

export default {
  hellosignApiKey: requireEnvString('HELLOSIGN_API_KEY'),
  hellosignTemplateSignerRole: requireEnvString('HELLOSIGN_TEMPLATE_SIGNER_ROLE'),
  hellosignClientId: requireEnvString('HELLOSIGN_CLIENT_ID'),
  hellosignTestMode: isHelloSignInTestMode(),
};
