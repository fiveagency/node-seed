import { jsonapi } from '../../shared/io';
import { loadModel } from '../../shared/db';
import { Animal } from '../data/animal-model';
import { ANIMAL_TYPE } from './types';

jsonapi.registerType(ANIMAL_TYPE, {
  load: loadModel(Animal),
});
