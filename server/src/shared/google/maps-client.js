import Promise from 'bluebird';
import googleMaps from '@google/maps';
import config from './config';

export default googleMaps.createClient({
  key: config.googleMapsApiKey,
  Promise,
});
