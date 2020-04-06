import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';

import { Human } from '../../human/data/human-model';

@Table({ modelName: 'Zoos' })
export class Zoo extends Model<Zoo> {
  @Column(DataType.STRING)
  name?: string;

  @HasMany(() => Human)
  employees?: Human[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default Zoo;
