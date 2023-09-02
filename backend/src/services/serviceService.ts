import Service from "../models/serviceModel";
import HttpError from "../utility/HttpError";

export default class ServiceService {
  static async createService(data: any) {
    const newService = await Service.create(data);
    return newService;
  }

  static async updateService(id: number, data: any) {
    const service = await Service.findByPk(id);
    if (!service) {
      throw new HttpError("Service not found", 404);
    }
    const updatedService = await service.update(data);
    return updatedService;
  }

  static async deleteService(id: number) {
    const service = await Service.findByPk(id);
    if (!service) {
      throw new HttpError("Service not found", 404);
    }
    await service.destroy();
    return { message: "Service deleted successfully" };
  }

  static async getAllServices() {
    const services = await Service.findAll();
    return services;
  }

  static async getServiceById(id: number) {
    const service = await Service.findByPk(id);
    if (!service) {
      throw new HttpError("Service not found", 404);
    }
    return service;
  }
}
