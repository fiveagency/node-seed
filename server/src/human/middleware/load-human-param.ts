import parseIntStrict from 'parse-int';
import { asyncParamMiddleware } from '../../shared/express';
import { errors, generateErrorCode } from '../../shared/error';
import humanRepository from '../data/human-repository';
import { setHuman } from '../service';

export default function () {
  return asyncParamMiddleware(async (req, res, id) => {
    const dbId = parseIntStrict(id);
    const human = dbId && (await humanRepository.get(dbId));
    if (!human) {
      throw new errors.NotFoundError('Human not found', generateErrorCode('human', 'notFound', 'humanNotFound'));
    }

    setHuman(req, human);
  });
}
