import { Column, DataType, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ modelName: 'Animals' })
export class Animal extends Model<Animal> {
  @Column(DataType.STRING)
  name?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default Animal;
