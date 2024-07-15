import { Router } from "express";
import { crearColeccion,obtenerColecciones,guardarRecursoEnColeccion,obtenerColeccionesPublicas,obtenerRecursosDeColeccion, obtenerColeccionesPrivadas,eliminarColeccion,eliminarRecursoDeColeccion } from '../controllers/colecciones.controller.js';
import validateToken from "../routes/validate-token.js";

const router = Router();

router.post('/colecciones', validateToken, crearColeccion);
router.get('/colecciones', validateToken, obtenerColecciones);
router.post('/colecciones/guardar-recurso', validateToken, guardarRecursoEnColeccion);
router.get('/colecciones/publicas', obtenerColeccionesPublicas);
router.get('/colecciones/:coleccion_id/recursos', obtenerRecursosDeColeccion);
router.get('/colecciones/privadas',validateToken,obtenerColeccionesPrivadas);
router.delete('/colecciones/:coleccion_id',validateToken,eliminarColeccion);
router.delete('/colecciones/:coleccion_id/recurso/:recurso_id',validateToken,eliminarRecursoDeColeccion);


export default router;
