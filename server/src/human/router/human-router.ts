import express, { Router } from 'express';
import { jsonapi } from '../../shared/io';
import '../io';
import controller from '../controllers/human-controller';
import { loadHumanParam } from '../middleware';
import { HUMAN_TYPE } from '../io/types';

const humanRouter: Router = express.Router();

humanRouter.param('humanId', loadHumanParam());

humanRouter.get(
  '/all', //
  jsonapi.parseInput(),
  controller.getAll(),
  jsonapi.generateOutput(HUMAN_TYPE),
);

humanRouter.get(
  '/', //
  jsonapi.parseInput(),
  controller.find(),
  jsonapi.generateOutput(HUMAN_TYPE),
);

humanRouter.get(
  '/:humanId', //
  jsonapi.parseInput(),
  controller.get(),
  jsonapi.generateOutput(HUMAN_TYPE),
);

humanRouter.post(
  '/', //
  jsonapi.parseInput(HUMAN_TYPE),
  controller.create(),
  jsonapi.generateOutput(HUMAN_TYPE),
);

humanRouter.patch(
  '/:humanId', //
  jsonapi.parseInput(HUMAN_TYPE),
  controller.update(),
  jsonapi.generateOutput(HUMAN_TYPE),
);

humanRouter.delete(
  '/:humanId', //
  jsonapi.parseInput(),
  controller.remove(),
  jsonapi.generateOutput(HUMAN_TYPE),
);

export { humanRouter };
