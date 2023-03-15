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
exports.isDealer = exports.isAuth = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mysql_connector_1 = require("../db/mysql.connector");
const SECRET_KEY = "mySecretKey";
const createToken = (usuario) => {
    const payload = {
        usuario: {
            alias: usuario.alias,
            email: usuario.email,
        },
    };
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};
exports.createToken = createToken;
const isAuth = (req, response, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (authHeader) {
            const token = authHeader && authHeader.split(" ")[1];
            if (token) {
                const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
                //console.log(decoded);
                req.body.auth = decoded.usuario;
                next();
            }
        }
        else {
            const message = {
                text: "No autorizado",
            };
            response.status(401).json(message);
        }
    }
    catch (err) {
        console.error(err);
        const message = {
            text: "No autorizado",
        };
        response.status(401).json(message);
    }
};
exports.isAuth = isAuth;
const isDealer = (req, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAutenticated = req.body.auth;
        const idServicio = Number(req.params.id);
        const sql = `select * from interesados where email_profesional = '${userAutenticated.email}' and id_servicio = ${idServicio}`;
        const interesadosDB = yield (0, mysql_connector_1.executeQuery)(sql);
        if (interesadosDB.length) {
            next();
        }
        else
            response.status(401).json("No autorizado");
    }
    catch (err) {
        console.error(err);
        const message = {
            text: "No autorizado",
        };
        response.status(401).json(message);
    }
});
exports.isDealer = isDealer;
