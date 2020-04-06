import parseIntStrict from 'parse-int';
import { asyncParamMiddleware } from '../../shared/express';
import { errors, generateErrorCode } from '../../shared/error';
import zooRepository from '../data/zoo-repository';
import { setZoo } from '../service';

export default function () {
  return asyncParamMiddleware(async (req, res, id) => {
    const dbId = parseIntStrict(id);
    const zoo = dbId && (await zooRepository.get(dbId));
    if (!zoo) {
      throw new errors.NotFoundError('Zoo not found', generateErrorCode('zoo', 'notFound', 'zooNotFound'));
    }

    setZoo(req, zoo);
  });
}
