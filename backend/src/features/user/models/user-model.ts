import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../db/database'

class User extends Model {
  id!: number
  name!: string
  email!: string
  password!: string
  role!: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      defaultValue: 'admin', // we'll only have admin users for now
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },

  {
    tableName: 'users',
    sequelize,
  }
)

export default User
