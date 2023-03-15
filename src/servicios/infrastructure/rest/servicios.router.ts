import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import IServiciosRepository from "../../application/Iservicios.repository";
//repository
import ServiciosRepositoryMysql from "../services/servicios.repository.mysql";
//domain
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/token/auth";
import Usuario from "../../domain/Servicio";
import Servicio from "../../domain/Servicio";



//implementation
const IserviciosRepository: IServiciosRepository = new ServiciosRepositoryMysql();

router.post("/create", isAuth ,async (req: Request, res: Response) => {
  try {
    const newService: Servicio = await IserviciosRepository.create(req.body,req.body.auth);
    if (newService) {
      res.send(newService);
    } else {
      const message: Message = {
        text: "Datos Incorrectos",
      };
      res.status(404).send(message);
    }
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});
router.get("/", isAuth ,async (req: Request, res: Response) => {
  try {
    const servicios: Servicio[] = await IserviciosRepository.getAll()
    if (servicios) {
      res.send(servicios);
    } else {
      const message: Message = {
        text: "Datos Incorrectos",
      };
      res.status(404).send(message);
    }
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});
router.get("/filter", isAuth ,async (req: Request, res: Response) => {
  try {
    const servicios: Servicio[] = await IserviciosRepository.getByFilter(req.body);
    if (servicios) {
      res.send(servicios);
    } else {
      const message: Message = {
        text: "Datos Incorrectos",
      };
      res.status(404).send(message);
    }
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});
router.get("/:idCategoria", isAuth ,async (req: Request, res: Response) => {
  try {
    const servicios: Servicio[] = await IserviciosRepository.getByCategoria(Number(req.params.idCategoria))
    if (servicios) {
      res.send(servicios);
    } else {
      const message: Message = {
        text: "Datos Incorrectos",
      };
      res.status(404).send(message);
    }
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

export { router as routerServicios };
