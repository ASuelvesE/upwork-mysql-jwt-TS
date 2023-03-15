import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger/swagger-output.json')

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

const allowedOrigins = ["*"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

//routers
import { routerUsuarios } from "./usuarios/infrastructure/rest/usuarios.router";
import { routerServicios } from "./servicios/infrastructure/rest/servicios.router";
import { routerInteresados } from "./interesados/infrastructure/rest/interesados.router";
import { routerCategorias } from "./categorias/infrastructure/rest/categorias.router";


app.use("/api/usuarios", routerUsuarios);
app.use("/api/servicios", routerServicios);
app.use("/api/interesados", routerInteresados);
app.use("/api/categorias", routerCategorias);
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});
