import { Request } from 'express';
import { getLocals, setLocals } from '../../shared/express';
import { Zoo } from '../data/zoo-model';
import { ZOO_LOCALS_PATH } from '../const';

export function getZoo(req: Request): Zoo {
  return getLocals<Zoo>(req, ZOO_LOCALS_PATH);
}

export function setZoo(req: Request, zoo: Zoo): void {
  setLocals(req, ZOO_LOCALS_PATH, zoo);
}
