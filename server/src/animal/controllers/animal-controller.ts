import _ from 'lodash';
import { Request, Response } from 'express';
import { io } from '../../shared/io';
import { asyncMiddleware } from '../../shared/express';
import animalRepository from '../data/animal-repository';
import { getAnimal } from '../service';

export class AnimalController {
  create() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const data = _.pick(io.get(req), ['name']);

      const animal = await animalRepository.create(data);
      io.setCreated(res, animal);
    });
  }

  update() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const animal = getAnimal(req);

      const changes = _.pick(io.get(req), ['name']);

      const animalUpdated = await animalRepository.update(animal.id, changes);
      io.set(res, animalUpdated);
    });
  }

  get() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const animal = getAnimal(req);
      io.set(res, animal);
    });
  }

  getAll() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const animals = await animalRepository.getAll();
      io.set(res, animals);
    });
  }

  find() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const filter = io.getFilter(req);
      const pageOptions = io.getPageOrDefault(req);
      const sortOptions = io.getSort(req);

      const animals = await animalRepository.findPage(filter, sortOptions, pageOptions);

      io.set(res, animals.getPageItems());
      io.setPage(res, animals.getPageInfo());
    });
  }

  remove() {
    return asyncMiddleware(async (req: Request, res: Response) => {
      const animal = getAnimal(req);
      await animalRepository.remove(animal.id);

      io.setEmpty(res);
    });
  }
}

export default new AnimalController();
