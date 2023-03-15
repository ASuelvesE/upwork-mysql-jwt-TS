import Categoria from "../../categorias/domain/categoria";


export default interface Usuario {
  id?: Number;
  token?: String,
  alias: String,
  email: String,
  contrasena: String,
}
