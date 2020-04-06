import express, { Router } from 'express';
import { jsonapi } from '../../shared/io';
import '../io';
import controller from '../controllers/zoo-controller';
import { loadZooParam } from '../middleware';
import { ZOO_TYPE } from '../io/types';

const zooRouter: Router = express.Router();

zooRouter.param('zooId', loadZooParam());

zooRouter.get(
  '/all', //
  jsonapi.parseInput(),
  controller.getAll(),
  jsonapi.generateOutput(ZOO_TYPE),
);

zooRouter.get(
  '/', //
  jsonapi.parseInput(),
  controller.find(),
  jsonapi.generateOutput(ZOO_TYPE),
);

zooRouter.get(
  '/:zooId', //
  jsonapi.parseInput(),
  controller.get(),
  jsonapi.generateOutput(ZOO_TYPE),
);

zooRouter.post(
  '/', //
  jsonapi.parseInput(ZOO_TYPE),
  controller.create(),
  jsonapi.generateOutput(ZOO_TYPE),
);

zooRouter.patch(
  '/:zooId', //
  jsonapi.parseInput(ZOO_TYPE),
  controller.update(),
  jsonapi.generateOutput(ZOO_TYPE),
);

zooRouter.delete(
  '/:zooId', //
  jsonapi.parseInput(),
  controller.remove(),
  jsonapi.generateOutput(ZOO_TYPE),
);

export { zooRouter };
