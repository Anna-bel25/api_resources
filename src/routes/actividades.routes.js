import { Router } from "express";
import { 
    getActividades,
    getActividades_materia,
    getActividad,

    createActividad,
    updateActividad,
    deleteActividad
} from '../controllers/actividades.controller.js'

const router = Router()

router.get('/actividades', getActividades);
router.get('/actividades/materia/:id', getActividades_materia);
router.get('/actividades/actividad/:id', getActividad);


router.post('/actividades', createActividad);

router.patch('/actividades/actividad/:id', updateActividad);

router.delete('/actividades/actividad/:id', deleteActividad);


export default router