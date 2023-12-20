import { Association, DataTypes, Model } from 'sequelize'
import sequelize from '../../../db/database'
import BookingTime from '../../bookingtime/models/booking-time-model'

export interface BookingInstance extends Model {
  id: number
  bookingTimeId: number
  name: string
  email: string
  phoneNumber: string
  numberOfGuests: number
  preferences: string
  confirmed: boolean
  date: Date

  bookingTime?: BookingTime
}

export class Booking extends Model implements BookingInstance {
  id!: number
  bookingTimeId!: number
  name!: string
  email!: string
  phoneNumber!: string
  numberOfGuests!: number
  preferences!: string
  confirmed!: boolean
  date!: Date

  static associations: {
    bookingTime: Association<Booking, BookingTime>
  }
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    bookingTimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preferences: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'bookings',
    sequelize,
  }
)
