import express from "express";
import ServiceService from "../services/service-service";
import { isAdmin } from "../../../middlewares/is-admin";

const ServiceController = express.Router();

// create new service
ServiceController.post("/create", isAdmin, async (req, res, next) => {
  try {
    const { name, description, booking_type } = req.body;
    const newService = await ServiceService.createService({
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
    const services = await ServiceService.getAllServices();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
});

// get service by id
ServiceController.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await ServiceService.getServiceById(Number(id));
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
});

// update service
ServiceController.put("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, booking_type } = req.body;
    const updatedService = await ServiceService.updateService(Number(id), {
      name,
      description,
      booking_type,
    });
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
});

// delete service
ServiceController.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedService = await ServiceService.deleteService(Number(id));
    res.status(200).json(deletedService);
  } catch (error) {
    next(error);
  }
});

export default ServiceController;
