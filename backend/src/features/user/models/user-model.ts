import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../db/database'

class User extends Model {
  id!: number
  name!: string
  email!: string
  password!: string
  role!: string
  phoneNumber!: string
  preferences!: string
  subscribedToNewsletter!: boolean

  readonly createdAt!: Date
  readonly updatedAt!: Date
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
      defaultValue: 'customer',
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    phoneNumber: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    preferences: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    subscribedToNewsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },

  {
    tableName: 'users',
    sequelize,
  }
)

export default User
