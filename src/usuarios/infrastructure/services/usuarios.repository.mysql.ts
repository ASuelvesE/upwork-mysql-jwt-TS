
import Message from "../../../context/responses/Message";
import { executeQuery } from "../../../context/db/mysql.connector";
import Usuario from "../../domain/Usuario";
import IUsuariosRepository from "../../application/Iusuarios.repository";
import { hash, compare } from "../../../context/token/encrypter";
import { createToken } from "../../../context/token/auth";



export default class UsuariosRepositoryMysql implements IUsuariosRepository {

  async register(usuario: Usuario): Promise<Usuario> {
    const sql: string = `insert into usuarios (alias,email,contrasena) values ('${usuario.alias}','${usuario.email}','${hash(usuario.contrasena)}')`
    try {
      await executeQuery<Usuario[]>(sql);
      usuario.contrasena = hash(usuario.contrasena);
      return usuario;
    } catch (error) {
      //console.error(error);
      return usuario;
    };
  }
  async login(usuario: Usuario): Promise<Usuario> {
    const sql: string = `select * from usuarios where alias = '${usuario.alias}' or email = '${usuario.email}'`;
    try {
      const usuariosDB: any = await executeQuery<Usuario[]>(sql);

      if (usuariosDB && usuario.contrasena) {
        if (compare(usuario.contrasena, usuariosDB[0].contrasena)) {
          usuario.email = usuariosDB[0].email;
          usuario.contrasena = usuariosDB[0].contrasena;
          usuario.token = createToken(usuario);
        }
      }
      return usuario;
    } catch (error) {
      //console.error(error);
      return usuario;
    };
  }
}
