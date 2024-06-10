import { Router } from "express";
import { crearColeccion,obtenerColecciones } from '../controllers/colecciones.controller.js';
import validateToken from "../routes/validate-token.js";

const router = Router();

router.post('/colecciones', validateToken, crearColeccion);
router.get('/colecciones', validateToken, obtenerColecciones);


export default router;
