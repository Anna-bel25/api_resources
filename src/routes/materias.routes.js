import { Router } from "express";
import { 
    getMaterias, 
    createMateria, 
    updateMateria,
    deleteMateria,
    
    getMateria,
    getMateria_nivel
} from '../controllers/materias.controller.js'

const router = Router()

router.get('/materias', getMaterias);
router.get('/materias/nivel/:id', getMateria_nivel);
router.get('/materias/materia/:id', getMateria);


router.post('/materias', createMateria);

router.patch('/materias/materia/:id', updateMateria);

router.delete('/materias/materia/:id', deleteMateria);


export default router