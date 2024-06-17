import { Router } from "express";
import { crearColeccion,obtenerColecciones,guardarRecursoEnColeccion } from '../controllers/colecciones.controller.js';
import validateToken from "../routes/validate-token.js";

const router = Router();

router.post('/colecciones', validateToken, crearColeccion);
router.get('/colecciones', validateToken, obtenerColecciones);
router.post('/colecciones/guardar-recurso', validateToken, guardarRecursoEnColeccion);



export default router;
