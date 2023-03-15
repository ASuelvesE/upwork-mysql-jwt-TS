
import Message from "../../context/responses/Message";
import Servicio from "../../servicios/domain/Servicio";
import Usuario from "../../usuarios/domain/Usuario";
import Categoria from "../domain/categoria";


export default interface ICategoriasRepository {

  join(id_categoria: Number, usuario: Usuario): Promise<Categoria[]>;
  getAllByUser(usuario: Usuario): Promise<Categoria[]>;
  getServicesByCategoria(idCategoria: Number): Promise<Servicio[]>;
  leave(id_categoria: Number, usuario: Usuario): Promise<Categoria[]>;
}
