import Service from '../models/service-model'
import HttpError from '../../../utility/http-error'

interface ServicePayload {
  name: string
  description: string
  booking_type: string
}

export default class ServiceService {
  async createService(payload: ServicePayload) {
    const newService = await Service.create({
      name: payload.name,
      description: payload.description,
      booking_type: payload.booking_type,
    })
    return newService
  }

  async updateService(id: number, payload: ServicePayload) {
    const service = await Service.findByPk(id)
    if (!service) {
      throw new HttpError('Service not found', 404)
    }
    const updatedService = await service.update(payload)
    return updatedService
  }

  async deleteService(id: number) {
    const service = await Service.findByPk(id)
    if (!service) {
      throw new HttpError('Service not found', 404)
    }
    await service.destroy()
    return { message: 'Service deleted successfully' }
  }

  async getAllServices() {
    const services = await Service.findAll()
    return services
  }

  async getServiceById(id: number) {
    const service = await Service.findByPk(id)
    if (!service) {
      throw new HttpError('Service not found', 404)
    }
    return service
  }
}
