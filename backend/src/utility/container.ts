import { container } from 'tsyringe'
import AuthService from '../features/auth/services/auth-service'
import BookingService from '../features/booking/services/booking-service'
import BookingTimeService from '../features/bookingtime/services/booking-time-service'
import ServiceService from '../features/service/services/service-service'
import UserService from '../features/user/services/user-service'
import { MailerService } from './mailer-service'

container.register<UserService>('UserService', { useClass: UserService })
container.register<BookingService>('BookingService', {
  useClass: BookingService,
})
container.register<BookingTimeService>('BookingTimeService', {
  useClass: BookingTimeService,
})
container.register<ServiceService>('ServiceService', {
  useClass: ServiceService,
})
container.register<AuthService>('AuthService', { useClass: AuthService })
container.register<typeof MailerService>('MailerService', {
  useValue: MailerService,
})

export default container
