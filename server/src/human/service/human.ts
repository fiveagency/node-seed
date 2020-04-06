import { Request } from 'express';
import { getLocals, setLocals } from '../../shared/express';
import { Human } from '../data/human-model';
import { HUMAN_LOCALS_PATH } from '../const';

export function getHuman(req: Request): Human {
  return getLocals<Human>(req, HUMAN_LOCALS_PATH);
}

export function setHuman(req: Request, human: Human): void {
  setLocals(req, HUMAN_LOCALS_PATH, human);
}
