"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_connector_1 = require("../../../context/db/mysql.connector");
const servicios_repository_mysql_1 = __importDefault(require("../../../servicios/infrastructure/services/servicios.repository.mysql"));
//implementation
const IserviciosRepository = new servicios_repository_mysql_1.default();
class CategoriasRepositoryMysql {
    getServicesByCategoria(idCategoria) {
        return __awaiter(this, void 0, void 0, function* () {
            return IserviciosRepository.getByCategoria(idCategoria);
        });
    }
    join(id_categoria, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `insert into suscripciones values('${usuario.email}',${id_categoria})`;
                yield (0, mysql_connector_1.executeQuery)(sql);
                return this.getAllByUser(usuario);
            }
            catch (error) {
                //console.error(error);
                return [];
            }
            ;
        });
    }
    getAllByUser(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorias = [];
                const sql = `select s.*, c.* from suscripciones s
      join categorias c on c.id = s.id_categoria
      where email_usuario = '${usuario.email}'`;
                const categoriasDB = yield (0, mysql_connector_1.executeQuery)(sql);
                for (let categoriaDB of categoriasDB) {
                    const newCategoria = {
                        id: categoriaDB.id_categoria,
                        descripcion: categoriaDB.descripcion
                    };
                    categorias.push(newCategoria);
                }
                return categorias;
            }
            catch (error) {
                //console.error(error);
                return [];
            }
            ;
        });
    }
    leave(id_categoria, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `delete from suscripciones where email_usuario = '${usuario.email}' and id_categoria = ${id_categoria}`;
                yield (0, mysql_connector_1.executeQuery)(sql);
                return this.getAllByUser(usuario);
            }
            catch (error) {
                //console.error(error);
                return [];
            }
            ;
        });
    }
}
exports.default = CategoriasRepositoryMysql;
