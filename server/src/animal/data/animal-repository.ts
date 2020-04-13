import Animal from './animal-model';
import { CrudSequelizeRepository } from '../../shared/repository';

export class AnimalRepository extends CrudSequelizeRepository<Animal> {
  constructor() {
    super(Animal);
  }
}

export default new AnimalRepository();
