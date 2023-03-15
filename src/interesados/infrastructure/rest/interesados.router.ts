import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import IInteresadosRepository from "../../application/Iinteresados.repository";
//repository
import InteresadosRepositoryMysql from "../services/interesados.repository.mysql";

//domain
import Message from "../../../context/responses/Message";
import { isAuth , isDealer} from "../../../context/token/auth";
import Usuario from "../../domain/Interesado";
import Interesado from "../../domain/Interesado";


//implementation
const IinteresadosRepository: IInteresadosRepository = new InteresadosRepositoryMysql();

router.post("/:id", isAuth , async (req: Request, res: Response) => { //Podrán suscribirse para contactar con el profesional

  try {
    const newInteresado: Interesado = await IinteresadosRepository.join(Number(req.params.id),req.body.auth);
    if (newInteresado) {
      res.send(newInteresado);
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

router.delete("/:id", isAuth , async (req: Request, res: Response) => { //Dejar de mostrar interés en el servicio
  try {
    const misInteresados: Interesado[] = await IinteresadosRepository.leave(Number(req.params.id),req.body.auth);
    if (misInteresados) {
      res.send(misInteresados);
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
router.get("/", isAuth, async (req: Request, res: Response) => { //Ver los servicios en los que estoy interesado
  try {
    
    const interesados: Interesado[] = await IinteresadosRepository.getAllByClient(req.body.auth);
    //console.log(interesados);
    if (interesados) {
      res.send(interesados);
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
router.get("/:id", isAuth, isDealer,  async (req: Request, res: Response) => { //Un profesional debe ver aquellos demandantes que han mostrado interés 
  try {
    const idServicio : Number = Number(req.params.id);
    const interesados: Interesado[] = await IinteresadosRepository.getAllByIDServicios(idServicio,req.body.auth);
    //console.log(interesados);
    if (interesados) {
      res.send(interesados);
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



export { router as routerInteresados };
