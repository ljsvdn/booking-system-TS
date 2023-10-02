import express from "express";
import ServiceService from "../services/service-service";
import { isAdmin } from "../../../middlewares/is-admin";

const ServiceController = express.Router();

// create new service
ServiceController.post("/create", isAdmin, async (req, res, next) => {
  try {
    const serviceService =
      req.container.resolve<ServiceService>("ServiceService");
    const { name, description, booking_type } = req.body;
    const newService = await serviceService.createService({
      name,
      description,
      booking_type,
    });
    res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
});

// get all services
ServiceController.get("/all", async (req, res, next) => {
  try {
    const serviceService =
      req.container.resolve<ServiceService>("ServiceService");
    const services = await serviceService.getAllServices();
    res.json(services);
  } catch (error) {
    next(error);
  }
});

// get service by id
ServiceController.get("/:id", async (req, res, next) => {
  try {
    const serviceService =
      req.container.resolve<ServiceService>("ServiceService");
    const { id } = req.params;
    const service = await serviceService.getServiceById(Number(id));
    res.json(service);
  } catch (error) {
    next(error);
  }
});

// update service
ServiceController.put("/:id", isAdmin, async (req, res, next) => {
  try {
    const serviceService =
      req.container.resolve<ServiceService>("ServiceService");
    const { id } = req.params;
    const { name, description, booking_type } = req.body;
    const updatedService = await serviceService.updateService(Number(id), {
      name,
      description,
      booking_type,
    });
    res.json(updatedService);
  } catch (error) {
    next(error);
  }
});

// delete service
ServiceController.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const serviceService =
      req.container.resolve<ServiceService>("ServiceService");
    const { id } = req.params;
    const deletedService = await serviceService.deleteService(Number(id));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default ServiceController;
