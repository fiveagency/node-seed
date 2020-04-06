import Zoo from './zoo-model';
import { CrudSequelizeRepository } from '../../shared/repository';

export class ZooRepository extends CrudSequelizeRepository<Zoo> {
  constructor() {
    super(Zoo);
  }
}

export default new ZooRepository();
