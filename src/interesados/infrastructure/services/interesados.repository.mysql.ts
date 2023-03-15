
import Message from "../../../context/responses/Message";
import { executeQuery } from "../../../context/db/mysql.connector";
import IUsuariosRepository from "../../application/Iinteresados.repository";
import { hash, compare } from "../../../context/token/encrypter";
import { createToken } from "../../../context/token/auth";
import IInteresadosRepository from "../../application/Iinteresados.repository";
import Usuario from "../../../usuarios/domain/Usuario";
import Interesado from "../../domain/Interesado";


export default class InteresadosRepositoryMysql implements IInteresadosRepository {


  async join(id_servicio: Number, usuario: Usuario): Promise<Interesado> {

    try {
      const sql: string = `select * from servicios where id = ${id_servicio}`;
      const serviciosDB: any = await executeQuery<Usuario[]>(sql);
      console.log(serviciosDB[0].email_usuario)
      if(serviciosDB.length){

        const sql2: string = `insert into interesados 
        (email_usuario,id_servicio,email_profesional) 
        values('${usuario.email}',${id_servicio},'${serviciosDB[0].email_usuario}')`;        
        await executeQuery<Usuario[]>(sql2);
      }

      const newInteresado: Interesado = {
        email_usuario: usuario.email,
        id_servicio: id_servicio,
        email_profesional: serviciosDB[0].email_usuario
      }
      return newInteresado;
    } catch (error) {
      //console.error(error);
      const newInteresado: Interesado = {
        email_usuario: "",
        id_servicio: 0,
        email_profesional: ""
      }
      return newInteresado;
    };
  }
  async leave(id_servicio: Number, usuario: Usuario): Promise<Interesado[]> {
    const sql: string = `delete from interesados where email_usuario = '${usuario.email}' and id_servicio = ${id_servicio}`;
    try {
      await executeQuery<Interesado[]>(sql);

      return this.getAllByClient(usuario);
    } catch (error) {
      //console.error(error);
      return [];
    };
  }
  async getAllByClient(usuario: Usuario): Promise<Interesado[]> {
    const interesados: Interesado[] = [];
    const sql: string = `select * from interesados where email_usuario = '${usuario.email}'`;
    try {
      const interesadosDB: any[] = await executeQuery<Interesado[]>(sql);
      for (let interesadoDB of interesadosDB) {
        const newInteresado: Interesado = {
          email_usuario: interesadoDB.email_usuario,
          id_servicio: interesadoDB.id_servicio,
          email_profesional: interesadoDB.email_profesional
        }
        interesados.push(newInteresado);
      }
      return interesados;
    } catch (error) {
      //console.error(error);
      return [];
    };
  }
  async getAllByIDServicios(id_servicio: Number, usuario: Usuario): Promise<Interesado[]> {
    const interesados: Interesado[] = [];
    const sql: string = `select * from interesados where id_servicio = ${id_servicio} and email_profesional = '${usuario.email}'`;
    try {
      const interesadosDB: any[] = await executeQuery<Interesado[]>(sql);
      for (let interesadoDB of interesadosDB) {
        const newInteresado: Interesado = {
          email_usuario: interesadoDB.email_usuario,
          id_servicio: interesadoDB.id_servicio,
          email_profesional: interesadoDB.email_profesional
        }
        interesados.push(newInteresado);
      }
      return interesados;
    } catch (error) {
      //console.error(error);
      return [];
    };
  }
}
