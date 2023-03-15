
import Message from "../../../context/responses/Message";
import { executeQuery } from "../../../context/db/mysql.connector";
import IUsuariosRepository from "../../application/Icategoria.repository";
import { hash, compare } from "../../../context/token/encrypter";
import { createToken } from "../../../context/token/auth";
import IInteresadosRepository from "../../application/Icategoria.repository";
import Usuario from "../../../usuarios/domain/Usuario";
import Interesado from "../../domain/categoria";
import ICategoriasRepository from "../../application/Icategoria.repository";
import Categoria from "../../domain/categoria";
import Servicio from "../../../servicios/domain/Servicio";
import ServiciosRepositoryMysql from "../../../servicios/infrastructure/services/servicios.repository.mysql";
import IServiciosRepository from "../../../servicios/application/Iservicios.repository";

//implementation
const IserviciosRepository: IServiciosRepository = new ServiciosRepositoryMysql();

export default class CategoriasRepositoryMysql implements ICategoriasRepository {

  async getServicesByCategoria(idCategoria: Number): Promise<Servicio[]> {
    return IserviciosRepository.getByCategoria(idCategoria);
  }
  async join(id_categoria: Number, usuario: Usuario): Promise<Categoria[]> {

    try {
      const sql: string = `insert into suscripciones values('${usuario.email}',${id_categoria})`;

      await executeQuery<Categoria[]>(sql);

      return this.getAllByUser(usuario);
    } catch (error) {
      //console.error(error);
      return [];
    };
  }
  async getAllByUser(usuario: Usuario): Promise<Categoria[]> {
    try {
      const categorias: Categoria[] = [];

      const sql: string = `select s.*, c.* from suscripciones s
      join categorias c on c.id = s.id_categoria
      where email_usuario = '${usuario.email}'`;
      const categoriasDB: any[] = await executeQuery<Categoria[]>(sql);

      for (let categoriaDB of categoriasDB) {
        const newCategoria: any = {
          id: categoriaDB.id_categoria,
          descripcion: categoriaDB.descripcion
        }
        categorias.push(newCategoria);
      }
      return categorias;
    } catch (error) {
      //console.error(error);
      return [];
    };
  }
  async leave(id_categoria: Number, usuario: Usuario): Promise<Interesado[]> {
    try {
      const sql: string = `delete from suscripciones where email_usuario = '${usuario.email}' and id_categoria = ${id_categoria}`;

      await executeQuery<Categoria[]>(sql);

      return this.getAllByUser(usuario);
    } catch (error) {
      //console.error(error);
      return [];
    };
  }

}
