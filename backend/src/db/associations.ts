import { Booking } from '../features/booking/models/booking-model'
import BookingTime from '../features/bookingtime/models/booking-time-model'
import sequelize from './database'

Booking.belongsTo(BookingTime, {
  foreignKey: 'bookingTimeId',
  as: 'bookingTime',
})

BookingTime.hasMany(Booking, {
  foreignKey: 'bookingTimeId',
  as: 'bookings',
})

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('Database synced')
  } catch (error) {
    console.log('Error syncing database:', error)
  }
}

syncDatabase()
