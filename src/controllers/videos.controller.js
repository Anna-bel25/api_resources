import { pool } from "../db.js"


//--------------------------------------------- OBTENER TODOS LOS VIDEOS ---------------------------------------------
export const getVideos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_video');
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'No videos found'
            });
        }
        res.json(rows);
    } catch (error) {
        console.error('Error fetching videos:', error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};


//--------------------------------------------- OBETNER VIDEOS SEGUN SU MATERIA ---------------------------------------------
export const getVideo_materia = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_video WHERE materia_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Videos of video not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//--------------------------------------------- OBETNER UN VIDEO ---------------------------------------------
export const getVideo = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_video WHERE video_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Video not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }   
}

//--------------------------------------------- CREAR UN VIDEO ---------------------------------------------
export const createVideo = async (req, res) => {
    const {materia_id, titulo, url, descripcion, nivel, materia} = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO recurso_video 
            (
                materia_id, 
                titulo, 
                url, 
                descripcion, 
                nivel, 
                materia
            ) 
                VALUES (?, ?, ?, ?, ?, ?)`,
            [materia_id, titulo, url, descripcion, nivel, materia]
        );
        
        res.status(201).json({
            video_id: result.insertId,
            materia_id, 
            titulo, 
            url, 
            descripcion, 
            nivel, 
            materia
        });
    } catch (error) {
        console.error('Error creating video:', error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

// --------------------------------------------- ACTUALIZAR UN VIDEO ---------------------------------------------
export const updateVideo = async (req, res) => {
    const {id} = req.params
    const {materia_id, titulo, url, descripcion, nivel, materia} = req.body

    try {
        const [result] = await pool.query(
            `UPDATE recurso_video 
             SET 
                materia_id = IFNULL(?, materia_id), 
                titulo = IFNULL(?, titulo), 
                url = IFNULL(?, url), 
                descripcion = IFNULL(?, descripcion), 
                nivel = IFNULL(?, nivel), 
                materia = IFNULL(?, materia) 
             WHERE video_id = ?`, 
            [materia_id, titulo, url, descripcion, nivel, materia, id]
        );
        console.log(result)
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Video not found'
        })
        const [rows] = await pool.query('SELECT * FROM recurso_video WHERE video_id = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

// --------------------------------------------- ELIMINAR UN VIDEO ---------------------------------------------
export const deleteVideo = async (req, res) => {
    const [result] = await pool.query('DELETE FROM recurso_video WHERE video_id = ?', [req.params.id])
    if (result.affectedRows <= 0) {
        return res.status(404).json ({
            menssage: 'Video not found'
        })
    }
    res.sendStatus(204)
}