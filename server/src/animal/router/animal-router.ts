import express, { Router } from 'express';
import { jsonapi } from '../../shared/io';
import '../io';
import controller from '../controllers/animal-controller';
import { loadAnimalParam } from '../middleware';
import { ANIMAL_TYPE } from '../io/types';

const animalRouter: Router = express.Router();

animalRouter.param('animalId', loadAnimalParam());

animalRouter.get(
  '/all', //
  jsonapi.parseInput(),
  controller.getAll(),
  jsonapi.generateOutput(ANIMAL_TYPE),
);

animalRouter.get(
  '/', //
  jsonapi.parseInput(),
  controller.find(),
  jsonapi.generateOutput(ANIMAL_TYPE),
);

animalRouter.get(
  '/:animalId', //
  jsonapi.parseInput(),
  controller.get(),
  jsonapi.generateOutput(ANIMAL_TYPE),
);

animalRouter.post(
  '/', //
  jsonapi.parseInput(ANIMAL_TYPE),
  controller.create(),
  jsonapi.generateOutput(ANIMAL_TYPE),
);

animalRouter.patch(
  '/:animalId', //
  jsonapi.parseInput(ANIMAL_TYPE),
  controller.update(),
  jsonapi.generateOutput(ANIMAL_TYPE),
);

animalRouter.delete(
  '/:animalId', //
  jsonapi.parseInput(),
  controller.remove(),
  jsonapi.generateOutput(ANIMAL_TYPE),
);

export { animalRouter };
