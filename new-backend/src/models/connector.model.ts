import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { UserConnector } from './pivot-tables/user-connector.model';
import { IConnector } from '../types/models.interfaces';

@Table({
  tableName: 'connectors',
  timestamps: false,
})
export class Connector extends Model<IConnector> implements IConnector {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  apiUrl!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  apiKey!: string;

  @BelongsToMany(() => User, () => UserConnector)
  users!: User[];
}
