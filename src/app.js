import express from 'express';
import path from 'path';
import fileupload from 'express-fileupload';
import materiasRoutes from './routes/materias.routes.js';
import videosRoutes from './routes/videos.routes.js';
import actividadesRoutes from './routes/actividades.routes.js';
import librosRoutes from './routes/libros.routes.js';
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/user.routes.js';
import coleccionesRoutes from './routes/colecciones.routes.js';
import cors from 'cors';

const app = express();

app.use(cors({
    //origin: 'http://localhost:4200',
    origin: ['http://localhost:4200', 'https://learn-up-scamaiv.vercel.app'],
    //origin: ['http://localhost:4200', 'https://44f6-2800-440-2011-4600-d53d-6955-4fe9-3b6a.ngrok-free.app'],
  }));

app.use(express.json());

app.use(fileupload({
   createParentPath: true
 }));

app.use('/uploads', express.static(path.resolve('uploads')));
//app.use('/uploads', express.static('uploads'));
  
//app.use(express.json())

app.use(indexRoutes)
app.use('/api', materiasRoutes)
app.use('/api', videosRoutes)
app.use('/api', actividadesRoutes)
app.use('/api', librosRoutes)
// cambio maria
app.use('/api', userRoutes)
// ------------
app.use('/api',coleccionesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})



export default app;

