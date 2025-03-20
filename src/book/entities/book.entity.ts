import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Book extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  isbn: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  publisher: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  quantity: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  publicationYear: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  category: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isAvailable: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
