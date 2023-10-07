import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../db/database'

class BookingTime extends Model {
  id!: number
  time!: Date
}

BookingTime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    time: {
      type: new DataTypes.DATE(),
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
