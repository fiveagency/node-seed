import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript';

import { Zoo } from '../../zoo/data/zoo-model';

@Table({ modelName: 'Humans' })
export class Human extends Model<Human> {
  @Column(DataType.STRING)
  name?: string;

  @BelongsTo(() => Zoo)
  zoo?: Zoo[];

  @ForeignKey(() => Zoo)
  @Column(DataType.INTEGER)
  myZooId?: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default Human;
