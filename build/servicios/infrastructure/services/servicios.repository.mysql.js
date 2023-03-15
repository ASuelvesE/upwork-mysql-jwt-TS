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
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_connector_1 = require("../../../context/db/mysql.connector");
class ServiciosRepositoryMysql {
    create(servicio, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into servicios (email_usuario,id_categoria,provincia,fechaFinalizacion,descripcion,titulo) 
    values ('${usuario.email}',${servicio.id_categoria},'${servicio.provincia}','${servicio.fechaFinalizacion}',
    '${servicio.descripcion}','${servicio.titulo}')`;
            try {
                const newService = yield (0, mysql_connector_1.executeQuery)(sql);
                if (newService.insertId)
                    servicio.id = newService.insertId;
                servicio.email_usuario = usuario.email;
                return servicio;
            }
            catch (error) {
                console.error(error);
                return servicio;
            }
            ;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from servicios`;
            try {
                const servicios = yield (0, mysql_connector_1.executeQuery)(sql);
                return servicios;
            }
            catch (error) {
                console.error(error);
                return [];
            }
            ;
        });
    }
    getByFilter(servicio) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from servicios where 
     titulo LIKE '%${servicio.titulo}%'
     OR id_categoria = ${servicio.id_categoria} 
     OR fechaFinalizacion < '${servicio.fechaFinalizacion}' 
     OR provincia = '${servicio.provincia}'`;
            try {
                const servicios = yield (0, mysql_connector_1.executeQuery)(sql);
                return servicios;
            }
            catch (error) {
                console.error(error);
                return [];
            }
            ;
            ;
        });
    }
    getByCategoria(idCategoria) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from servicios where id_categoria = ${idCategoria}`;
            try {
                const servicios = yield (0, mysql_connector_1.executeQuery)(sql);
                return servicios;
            }
            catch (error) {
                console.error(error);
                return [];
            }
            ;
        });
    }
}
exports.default = ServiciosRepositoryMysql;
