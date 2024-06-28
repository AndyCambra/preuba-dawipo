import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';
import { Connector } from './connector.model';
import { UserConnector } from './pivot-tables/user-connector.model';
import { UserAttributes } from '../types/models.interfaces';

@Table({
  tableName: 'users',
  freezeTableName: true,
  timestamps: false,
})
export class User extends Model<UserAttributes> implements UserAttributes {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  avatarUrl?: string | null;

  @AllowNull(false)
  @Default('user')
  @Column(DataType.ENUM('user', 'admin'))
  rol!: 'user' | 'admin';

  @BelongsToMany(() => Connector, () => UserConnector)
  connectors!: Connector[];
}
