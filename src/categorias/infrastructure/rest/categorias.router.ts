import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import ICategoriasRepository from "../../application/Icategoria.repository";
//repository
import CategoriasRepositoryMysql from "../services/categorias.repository.mysql";

//domain
import Message from "../../../context/responses/Message";
import { isAuth , isDealer} from "../../../context/token/auth";
import Usuario from "../../domain/categoria";
import Interesado from "../../domain/categoria";




//implementation
const IcategoriasRepository: ICategoriasRepository = new CategoriasRepositoryMysql();

router.post("/:id", isAuth , async (req: Request, res: Response) => { //Suscripción de usuarios a categorías


  try {
    const suscripciones: any = await IcategoriasRepository.join(Number(req.params.id),req.body.auth);
    if (suscripciones) {
      res.send(suscripciones);
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
router.get("/", isAuth , async (req: Request, res: Response) => { //Ver suscripciones del usuario

  try {
    const suscripciones: any = await IcategoriasRepository.getAllByUser(req.body.auth);
    if (suscripciones) {
      res.send(suscripciones);
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
router.get("/:idCategoria", isAuth , async (req: Request, res: Response) => { //Ver servicios en categorías

  const idCategoria: Number = Number(req.params.idCategoria);
  try {
    const suscripciones: any = await IcategoriasRepository.getServicesByCategoria(idCategoria);
    if (suscripciones) {
      res.send(suscripciones);
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
router.delete("/:id", isAuth , async (req: Request, res: Response) => { //Dar de baja una categoría de suscripción

  try {
    const suscripciones: any = await IcategoriasRepository.leave(Number(req.params.id),req.body.auth);
    if (suscripciones) {
      res.send(suscripciones);
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



export { router as routerCategorias };
