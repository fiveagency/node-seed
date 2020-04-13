import { Request } from 'express';
import { getLocals, setLocals } from '../../shared/express';
import { Animal } from '../data/animal-model';
import { ANIMAL_LOCALS_PATH } from '../const';

export function getAnimal(req: Request): Animal {
  return getLocals<Animal>(req, ANIMAL_LOCALS_PATH);
}

export function setAnimal(req: Request, animal: Animal): void {
  setLocals(req, ANIMAL_LOCALS_PATH, animal);
}
