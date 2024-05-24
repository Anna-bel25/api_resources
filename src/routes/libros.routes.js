import { Router } from "express";
import { 
    getLibros,
    getLibro_materia,
    getLibro,

    createLibro,
    updateLibro,
    deleteLibro
} from '../controllers/libros.controller.js'

const router = Router()

router.get('/libros', getLibros);
router.get('/libros/nivel/:id', getLibro_materia);
router.get('/libros/libro/:id', getLibro);


router.post('/libros', createLibro);

router.patch('/libros/materia/:id', updateLibro);

router.delete('/libros/libro/:id', deleteLibro);


export default router