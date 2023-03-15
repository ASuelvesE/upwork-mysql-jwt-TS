import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import IUsuariosRepository from "../../application/Iusuarios.repository";
//repository
import UsuariosRepositoryMysql from "../services/usuarios.repository.mysql";

//domain
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/token/auth";
import Usuario from "../../domain/Usuario";


//implementation
const IusuariosRepository: IUsuariosRepository = new UsuariosRepositoryMysql();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const newUsuario: Usuario = await IusuariosRepository.register(req.body);
    if (newUsuario) {
      res.send(newUsuario);
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

router.post("/login", async (req: Request, res: Response) => {
  try {
    const usuarioLogeado: Usuario = await IusuariosRepository.login(req.body);
    //console.log(newUsuario);
    
    if (usuarioLogeado) {
      res.send(usuarioLogeado);
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

export { router as routerUsuarios };
