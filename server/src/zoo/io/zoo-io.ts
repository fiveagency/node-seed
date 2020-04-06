import { jsonapi } from '../../shared/io';
import { loadModel } from '../../shared/db';
import { Zoo } from '../data/zoo-model';
import { ZOO_TYPE } from './types';
import { HUMAN_TYPE } from '../../human/io/types';

jsonapi.registerType(ZOO_TYPE, {
  load: loadModel(Zoo),
  relationships: {
    employees: {
      type: HUMAN_TYPE,
    },
  },
});
