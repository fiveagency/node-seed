import parseIntStrict from 'parse-int';
import { asyncParamMiddleware } from '../../shared/express';
import { errors, generateErrorCode } from '../../shared/error';
import animalRepository from '../data/animal-repository';
import { setAnimal } from '../service';

export default function () {
  return asyncParamMiddleware(async (req, res, id) => {
    const dbId = parseIntStrict(id);
    const animal = dbId && (await animalRepository.get(dbId));
    if (!animal) {
      throw new errors.NotFoundError('Animal not found', generateErrorCode('animal', 'notFound', 'animalNotFound'));
    }

    setAnimal(req, animal);
  });
}
