import express from 'express';
import materiasRoutes from './routes/materias.routes.js';
import videosRoutes from './routes/videos.routes.js';
import actividadesRoutes from './routes/actividades.routes.js';
import indexRoutes from './routes/index.routes.js'

const app = express();

app.use(express.json())

app.use(indexRoutes)
app.use('/api', materiasRoutes)
app.use('/api', videosRoutes)
app.use('/api', actividadesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})


export default app;