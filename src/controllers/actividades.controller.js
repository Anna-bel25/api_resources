import { pool } from "../db.js"


//--------------------------------------------- OBTENER TODAS LAS ACTIVIDADES ---------------------------------------------
export const getActividades = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_actividad');
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'No actividad found'
            });
        }
        res.json(rows);
    } catch (error) {
        console.error('Error fetching actividad:', error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

//--------------------------------------------- OBETNER ACTIVIDAD SEGUN SU MATERIA ---------------------------------------------
export const getActividades_materia = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_actividad WHERE materia_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Actividades of materia not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//--------------------------------------------- OBETNER UN ACTIVIDAD ---------------------------------------------
export const getActividad = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_actividad WHERE actividad_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Actividad not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }   
}

//--------------------------------------------- CREAR UNA ACTIVIDAD ---------------------------------------------
export const createActividad = async (req, res) => {
    const {materia_id, titulo, imagen_url, url, descripcion, nivel, materia} = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO recurso_actividad 
            (
                materia_id, 
                titulo, 
                imagen_url, 
                url, 
                descripcion, 
                nivel, 
                materia
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [materia_id, titulo, imagen_url, url, descripcion, nivel, materia]
        );
        
        res.status(201).json({
            actividad_id: result.insertId,
            materia_id, 
            titulo,
            imagen_url,
            url, 
            descripcion, 
            nivel, 
            materia
        });
    } catch (error) {
        console.error('Error creating actividad:', error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

//--------------------------------------------- ACTUALIZAR UNA ACTIVIDAD ---------------------------------------------
export const updateActividad = async (req, res) => {
    const {id} = req.params
    const {materia_id, titulo, imagen_url,  url, descripcion, nivel, materia} = req.body

    try {
        const [result] = await pool.query(`
        UPDATE recurso_actividad 
        SET 
            materia_id = IFNULL(?, materia_id), 
            titulo = IFNULL(?, titulo), 
            imagen_url = IFNULL(?, imagen_url), 
            url = IFNULL(?, url), 
            descripcion = IFNULL(?, descripcion), 
            nivel = IFNULL(?, nivel), 
            materia = IFNULL(?, materia) 
        WHERE video_id = ?`,
        [materia_id, titulo, imagen_url, url, descripcion, nivel, materia, id]
    );
        console.log(result)
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Actividad not found'
        })
        const [rows] = await pool.query('SELECT * FROM recurso_actividad WHERE actividad_id = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//--------------------------------------------- ELIMINAR UNA ACTIVIDAD ---------------------------------------------
export const deleteActividad = async (req, res) => {
    const [result] = await pool.query('DELETE FROM recurso_actividad WHERE actividad_id = ?', [req.params.id])
    if (result.affectedRows <= 0) {
        return res.status(404).json ({
            menssage: 'Actividad not found'
        })
    }
    res.sendStatus(204)
}