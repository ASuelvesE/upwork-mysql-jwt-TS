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
class InteresadosRepositoryMysql {
    join(id_servicio, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `select * from servicios where id = ${id_servicio}`;
                const serviciosDB = yield (0, mysql_connector_1.executeQuery)(sql);
                console.log(serviciosDB[0].email_usuario);
                if (serviciosDB.length) {
                    const sql2 = `insert into interesados 
        (email_usuario,id_servicio,email_profesional) 
        values('${usuario.email}',${id_servicio},'${serviciosDB[0].email_usuario}')`;
                    yield (0, mysql_connector_1.executeQuery)(sql2);
                }
                const newInteresado = {
                    email_usuario: usuario.email,
                    id_servicio: id_servicio,
                    email_profesional: serviciosDB[0].email_usuario
                };
                return newInteresado;
            }
            catch (error) {
                //console.error(error);
                const newInteresado = {
                    email_usuario: "",
                    id_servicio: 0,
                    email_profesional: ""
                };
                return newInteresado;
            }
            ;
        });
    }
    leave(id_servicio, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `delete from interesados where email_usuario = '${usuario.email}' and id_servicio = ${id_servicio}`;
            try {
                yield (0, mysql_connector_1.executeQuery)(sql);
                return this.getAllByClient(usuario);
            }
            catch (error) {
                //console.error(error);
                return [];
            }
            ;
        });
    }
    getAllByClient(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const interesados = [];
            const sql = `select * from interesados where email_usuario = '${usuario.email}'`;
            try {
                const interesadosDB = yield (0, mysql_connector_1.executeQuery)(sql);
                for (let interesadoDB of interesadosDB) {
                    const newInteresado = {
                        email_usuario: interesadoDB.email_usuario,
                        id_servicio: interesadoDB.id_servicio,
                        email_profesional: interesadoDB.email_profesional
                    };
                    interesados.push(newInteresado);
                }
                return interesados;
            }
            catch (error) {
                //console.error(error);
                return [];
            }
            ;
        });
    }
    getAllByIDServicios(id_servicio, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const interesados = [];
            const sql = `select * from interesados where id_servicio = ${id_servicio} and email_profesional = '${usuario.email}'`;
            try {
                const interesadosDB = yield (0, mysql_connector_1.executeQuery)(sql);
                for (let interesadoDB of interesadosDB) {
                    const newInteresado = {
                        email_usuario: interesadoDB.email_usuario,
                        id_servicio: interesadoDB.id_servicio,
                        email_profesional: interesadoDB.email_profesional
                    };
                    interesados.push(newInteresado);
                }
                return interesados;
            }
            catch (error) {
                //console.error(error);
                return [];
            }
            ;
        });
    }
}
exports.default = InteresadosRepositoryMysql;
