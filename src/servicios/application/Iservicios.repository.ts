
import Usuario from "../../usuarios/domain/Usuario";
import Servicio from "../domain/Servicio"


export default interface IServiciosRepository {

  create(servicio: Servicio, usuario: Usuario): Promise<Servicio>;
  getAll(): Promise<Servicio[]>;
  getByFilter(servicio: Servicio): Promise<Servicio[]>;
  getByCategoria(idCategoria: Number): Promise<Servicio[]>
}
