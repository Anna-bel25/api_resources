import { Router } from "express";
import { 
    getVideo,
    getVideo_materia,
    getVideos,
    
    createVideo,
    updateVideo,
    deleteVideo
} from '../controllers/videos.controller.js'

const router = Router()

router.get('/videos', getVideos);
router.get('/videos/materia/:id', getVideo_materia);
router.get('/videos/video/:id', getVideo);


router.post('/videos', createVideo);

router.patch('/videos/video/:id', updateVideo);

router.delete('/videos/video/:id', deleteVideo);


export default router