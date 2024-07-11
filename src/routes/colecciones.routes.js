import { Router } from "express";
import { crearColeccion,obtenerColecciones,guardarRecursoEnColeccion,obtenerColeccionesPublicas,obtenerRecursosDeColeccion, obtenerColeccionesPrivadas } from '../controllers/colecciones.controller.js';
import validateToken from "../routes/validate-token.js";

const router = Router();

router.post('/colecciones', validateToken, crearColeccion);
router.get('/colecciones', validateToken, obtenerColecciones);
router.post('/colecciones/guardar-recurso', validateToken, guardarRecursoEnColeccion);
router.get('/colecciones/publicas', obtenerColeccionesPublicas);
router.get('/colecciones/:coleccion_id/recursos', obtenerRecursosDeColeccion);
router.get('/colecciones/privadas',validateToken,obtenerColeccionesPrivadas);


export default router;
