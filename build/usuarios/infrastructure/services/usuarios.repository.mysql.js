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
const encrypter_1 = require("../../../context/token/encrypter");
const auth_1 = require("../../../context/token/auth");
class UsuariosRepositoryMysql {
    register(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into usuarios (alias,email,contrasena) values ('${usuario.alias}','${usuario.email}','${(0, encrypter_1.hash)(usuario.contrasena)}')`;
            try {
                yield (0, mysql_connector_1.executeQuery)(sql);
                usuario.contrasena = (0, encrypter_1.hash)(usuario.contrasena);
                return usuario;
            }
            catch (error) {
                //console.error(error);
                return usuario;
            }
            ;
        });
    }
    login(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from usuarios where alias = '${usuario.alias}' or email = '${usuario.email}'`;
            try {
                const usuariosDB = yield (0, mysql_connector_1.executeQuery)(sql);
                if (usuariosDB && usuario.contrasena) {
                    if ((0, encrypter_1.compare)(usuario.contrasena, usuariosDB[0].contrasena)) {
                        usuario.email = usuariosDB[0].email;
                        usuario.contrasena = usuariosDB[0].contrasena;
                        usuario.token = (0, auth_1.createToken)(usuario);
                    }
                }
                return usuario;
            }
            catch (error) {
                //console.error(error);
                return usuario;
            }
            ;
        });
    }
}
exports.default = UsuariosRepositoryMysql;
