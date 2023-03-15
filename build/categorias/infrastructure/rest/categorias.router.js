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
exports.routerCategorias = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.routerCategorias = router;
//repository
const categorias_repository_mysql_1 = __importDefault(require("../services/categorias.repository.mysql"));
const auth_1 = require("../../../context/token/auth");
//implementation
const IcategoriasRepository = new categorias_repository_mysql_1.default();
router.post("/:id", auth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suscripciones = yield IcategoriasRepository.join(Number(req.params.id), req.body.auth);
        if (suscripciones) {
            res.send(suscripciones);
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
        const suscripciones = yield IcategoriasRepository.getAllByUser(req.body.auth);
        if (suscripciones) {
            res.send(suscripciones);
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
router.get("/:idCategoria", auth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategoria = Number(req.params.idCategoria);
    try {
        const suscripciones = yield IcategoriasRepository.getServicesByCategoria(idCategoria);
        if (suscripciones) {
            res.send(suscripciones);
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
        const suscripciones = yield IcategoriasRepository.leave(Number(req.params.id), req.body.auth);
        if (suscripciones) {
            res.send(suscripciones);
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
