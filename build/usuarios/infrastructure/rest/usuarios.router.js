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
exports.routerUsuarios = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.routerUsuarios = router;
//repository
const usuarios_repository_mysql_1 = __importDefault(require("../services/usuarios.repository.mysql"));
//implementation
const IusuariosRepository = new usuarios_repository_mysql_1.default();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUsuario = yield IusuariosRepository.register(req.body);
        if (newUsuario) {
            res.send(newUsuario);
        }
        else {
            const message = {
                text: "Datos Incorrectos",
            };
            res.status(404).send(message);
        }
    }
    catch (error) {
        const message = {
            text: String(error),
        };
        res.status(500).send(message);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioLogeado = yield IusuariosRepository.login(req.body);
        //console.log(newUsuario);
        if (usuarioLogeado) {
            res.send(usuarioLogeado);
        }
        else {
            const message = {
                text: "Datos Incorrectos",
            };
            res.status(404).send(message);
        }
    }
    catch (error) {
        const message = {
            text: String(error),
        };
        res.status(500).send(message);
    }
}));
