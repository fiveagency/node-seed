import Human from './human-model';
import { CrudSequelizeRepository } from '../../shared/repository';

export class HumanRepository extends CrudSequelizeRepository<Human> {
  constructor() {
    super(Human);
  }
}

export default new HumanRepository();
