
import Message from "../../../context/responses/Message";
import { executeQuery } from "../../../context/db/mysql.connector";

import { hash, compare } from "../../../context/token/encrypter";
import { createToken } from "../../../context/token/auth";
import IServiciosRepository from "../../application/Iservicios.repository";
import Categoria from "../../../interesados/domain/Interesado";
import Usuario from "../../../usuarios/domain/Usuario";
import Servicio from "../../domain/Servicio";



export default class ServiciosRepositoryMysql implements IServiciosRepository {


  async create(servicio: Servicio, usuario: Usuario): Promise<Servicio> {

    const sql: string = `insert into servicios (email_usuario,id_categoria,provincia,fechaFinalizacion,descripcion,titulo) 
    values ('${usuario.email}',${servicio.id_categoria},'${servicio.provincia}','${servicio.fechaFinalizacion}',
    '${servicio.descripcion}','${servicio.titulo}')`
    try {
      const newService: any = await executeQuery<Servicio>(sql);
      if (newService.insertId)
        servicio.id = newService.insertId;
        servicio.email_usuario = usuario.email;
      return servicio;
    } catch (error) {
      console.error(error);
      return servicio;
    };
  }
  async getAll(): Promise<Servicio[]> {
    const sql: string = `select * from servicios`
    try {
      const servicios: any = await executeQuery<Servicio>(sql);
      return servicios;
    } catch (error) {
      console.error(error);
      return [];
    };
  }
  async getByFilter(servicio: Servicio): Promise<Servicio[]> {
    const sql: string = `select * from servicios where 
     fechaFinalizacion < '${servicio.fechaFinalizacion}'
     AND titulo LIKE '%${servicio.titulo}%'
     OR id_categoria = ${servicio.id_categoria} 
     OR provincia = '${servicio.provincia}'`
     
    try {
      const servicios: any = await executeQuery<Servicio>(sql);
      return servicios;
    } catch (error) {
      console.error(error);
      return [];
    };;
  }

  async getByCategoria(idCategoria: Number): Promise<Servicio[]> {
    const sql: string = `select * from servicios where id_categoria = ${idCategoria}`
    try {
      const servicios: any = await executeQuery<Servicio>(sql);
      return servicios;
    } catch (error) {
      console.error(error);
      return [];
    };
  }
}
