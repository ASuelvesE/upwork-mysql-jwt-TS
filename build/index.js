"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger-output.json');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const allowedOrigins = ["*"];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
//routers
const usuarios_router_1 = require("./usuarios/infrastructure/rest/usuarios.router");
const servicios_router_1 = require("./servicios/infrastructure/rest/servicios.router");
const interesados_router_1 = require("./interesados/infrastructure/rest/interesados.router");
const categorias_router_1 = require("./categorias/infrastructure/rest/categorias.router");
app.use("/api/usuarios", usuarios_router_1.routerUsuarios);
app.use("/api/servicios", servicios_router_1.routerServicios);
app.use("/api/interesados", interesados_router_1.routerInteresados);
app.use("/api/categorias", categorias_router_1.routerCategorias);
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${port}`);
});
