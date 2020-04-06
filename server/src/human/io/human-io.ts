import { jsonapi } from '../../shared/io';
import { loadModel } from '../../shared/db';
import { Human } from '../data/human-model';
import { HUMAN_TYPE } from './types';
import { ZOO_TYPE } from '../../zoo/io/types';

jsonapi.registerType(HUMAN_TYPE, {
  load: loadModel(Human),
  relationships: {
    zoo: {
      type: ZOO_TYPE,
      alternativeKey: 'zooId',
    },
  },
});
