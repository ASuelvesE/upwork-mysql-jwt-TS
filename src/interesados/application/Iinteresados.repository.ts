
import Message from "../../context/responses/Message";
import Usuario from "../../usuarios/domain/Usuario";
import Interesado from "../domain/Interesado";
import Servicio from "../domain/Interesado"


export default interface IInteresadosRepository {

  join(id_servicio: Number, usuario: Usuario): Promise<Interesado>;
  leave(id_servicio: Number, usuario: Usuario): Promise<Interesado[]>;
  getAllByClient(usuario: Usuario): Promise<Interesado[]>;
  getAllByIDServicios(id_servicio: Number, usuario: Usuario): Promise<Interesado[]>;
}
