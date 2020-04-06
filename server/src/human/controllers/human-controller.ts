import _ from 'lodash';
import { Request, Response } from 'express';
import { io } from '../../shared/io';
import { asyncMiddleware } from '../../shared/express';
import humanRepository from '../data/human-repository';
import { getHuman } from '../service';

export class HumanController {
  create() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const data = _.pick(io.get(req), ['name']);

      const human = await humanRepository.create(data);
      io.setCreated(res, human);
    });
  }

  update() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const human = getHuman(req);

      const changes = _.pick(io.get(req), ['name']);

      const humanUpdated = await humanRepository.update(human.id, changes);
      io.set(res, humanUpdated);
    });
  }

  get() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const human = getHuman(req);
      io.set(res, human);
    });
  }

  getAll() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const humans = await humanRepository.getAll();
      io.set(res, humans);
    });
  }

  find() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const filter = io.getFilter(req);
      const pageOptions = io.getPageOrDefault(req);
      const sortOptions = io.getSort(req);

      const humans = await humanRepository.findPage(filter, sortOptions, pageOptions);

      io.set(res, humans.getPageItems());
      io.setPage(res, humans.getPageInfo());
    });
  }

  remove() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const human = getHuman(req);
      await humanRepository.remove(human.id);
      io.setEmpty(res);
    });
  }
}

export default new HumanController();
