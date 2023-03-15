
import Message from "../../context/responses/Message";
import Usuario from "../domain/Usuario"


export default interface IUsuariosRepository {

  register(usuario: Usuario): Promise<Usuario>;
  login(usuario: Usuario): Promise<Usuario>;
}
