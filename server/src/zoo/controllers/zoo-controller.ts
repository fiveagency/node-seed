import _ from 'lodash';
import { Request, Response } from 'express';
import { io } from '../../shared/io';
import { asyncMiddleware } from '../../shared/express';
import zooRepository from '../data/zoo-repository';
import { getZoo } from '../service';

export class ZooController {
  create() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const data = _.pick(io.get(req), ['name']);

      const zoo = await zooRepository.create(data);
      io.setCreated(res, zoo);
    });
  }

  update() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const zoo = getZoo(req);

      const changes = _.pick(io.get(req), ['name']);

      const zooUpdated = await zooRepository.update(zoo.id, changes);
      io.set(res, zooUpdated);
    });
  }

  get() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const zoo = getZoo(req);
      io.set(res, zoo);
    });
  }

  getAll() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const zoos = await zooRepository.getAll();
      io.set(res, zoos);
    });
  }

  find() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const filter = io.getFilter(req);
      const pageOptions = io.getPageOrDefault(req);
      const sortOptions = io.getSort(req);

      const zoos = await zooRepository.findPage(filter, sortOptions, pageOptions);

      io.set(res, zoos.getPageItems());
      io.setPage(res, zoos.getPageInfo());
    });
  }

  remove() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const zoo = getZoo(req);
      await zooRepository.remove(zoo.id);
      io.setEmpty(res);
    });
  }
}

export default new ZooController();
