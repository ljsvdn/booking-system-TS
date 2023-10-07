import { Booking } from '../features/booking/models/booking-model'
import BookingTime from '../features/bookingtime/models/booking-time-model'
import Service from '../features/service/models/service-model'
import User from '../features/user/models/user-model'
import sequelize from './database'

Booking.belongsTo(BookingTime, {
  foreignKey: 'bookingTimeId',
  as: 'bookingTime',
})

Booking.belongsTo(Service, {
  foreignKey: 'serviceId',
  as: 'service',
})

Booking.belongsTo(User, {
  foreignKey: 'customerId',
  as: 'user',
})

BookingTime.hasMany(Booking, {
  foreignKey: 'bookingTimeId',
  as: 'bookings',
})

Service.hasMany(Booking, {
  foreignKey: 'serviceId',
  as: 'bookings',
})

User.hasMany(Booking, {
  foreignKey: 'customerId',
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
