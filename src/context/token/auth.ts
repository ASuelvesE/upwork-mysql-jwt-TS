import { NextFunction, Request, Response } from "express";

import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import Usuario from "../../usuarios/domain/Usuario";
import { executeQuery } from "../db/mysql.connector";

import Message from "../responses/Message";
const SECRET_KEY: Secret = "mySecretKey";

const createToken = (usuario: Usuario): string => {
  const payload = {
    usuario: {
      alias: usuario.alias,
      email: usuario.email,
    },
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};

const isAuth = (req: Request, response: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token: string | undefined = authHeader && authHeader.split(" ")[1];
      if (token) {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        //console.log(decoded);

        req.body.auth = decoded.usuario;
        next();
      }
    } else {
      const message: Message = {
        text: "No autorizado",
      };
      response.status(401).json(message);
    }

  } catch (err) {
    console.error(err);
    const message: Message = {
      text: "No autorizado",
    };
    response.status(401).json(message);
  }
};

const isDealer = async (req: Request, response: Response, next: NextFunction) => { // Es el creador del servicio
  try {
    const userAutenticated = req.body.auth;
    const idServicio = Number(req.params.id);

    const sql = `select * from interesados where email_profesional = '${userAutenticated.email}' and id_servicio = ${idServicio}`;
    const interesadosDB: any[] = await executeQuery(sql);

    if (interesadosDB.length) {
      next();
    }
    else response.status(401).json("No autorizado");


  } catch (err) {
    console.error(err);
    const message: Message = {
      text: "No autorizado",
    };
    response.status(401).json(message);
  }
};

export { createToken, isAuth, isDealer };
