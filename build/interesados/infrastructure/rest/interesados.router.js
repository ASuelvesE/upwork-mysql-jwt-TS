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
exports.routerInteresados = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.routerInteresados = router;
//repository
const interesados_repository_mysql_1 = __importDefault(require("../services/interesados.repository.mysql"));
const auth_1 = require("../../../context/token/auth");
//implementation
const IinteresadosRepository = new interesados_repository_mysql_1.default();
router.post("/:id", auth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newInteresado = yield IinteresadosRepository.join(Number(req.params.id), req.body.auth);
        if (newInteresado) {
            res.send(newInteresado);
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
router.delete("/:id", auth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const misInteresados = yield IinteresadosRepository.leave(Number(req.params.id), req.body.auth);
        if (misInteresados) {
            res.send(misInteresados);
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
router.get("/", auth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interesados = yield IinteresadosRepository.getAllByClient(req.body.auth);
        //console.log(interesados);
        if (interesados) {
            res.send(interesados);
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
router.get("/:id", auth_1.isAuth, auth_1.isDealer, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idServicio = Number(req.params.id);
        const interesados = yield IinteresadosRepository.getAllByIDServicios(idServicio, req.body.auth);
        //console.log(interesados);
        if (interesados) {
            res.send(interesados);
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
