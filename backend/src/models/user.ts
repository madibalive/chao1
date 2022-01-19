import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/sequelize';

interface UserModelAttributes {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
}

interface UserModelCreationAttributes extends Optional<UserModelAttributes, 'id'> { }

export class UserModel extends Model<UserModelAttributes, UserModelCreationAttributes> implements UserModelAttributes {
  // attributes
  public id: number;
  public name: string;
  public email: string;
  public hashedPassword: string;

  // timestampsOn
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  sequelize
});
