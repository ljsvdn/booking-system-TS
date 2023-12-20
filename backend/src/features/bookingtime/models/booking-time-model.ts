import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../db/database'

class BookingTime extends Model {
  id!: number
  date!: Date
  startTime!: string
}

BookingTime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'booking_times',
    sequelize,
    timestamps: true,
  }
)

export default BookingTime
