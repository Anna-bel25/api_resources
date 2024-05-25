import { pool } from "../db.js"


//--------------------------------------------- OBETNER TODAS LAS MATERIAS ---------------------------------------------
export const getMaterias = async (req, res) => {
    try {
        ///throw new Error('Error')
        const [rows] = await pool.query('SELECT * FROM materia_nivel')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//--------------------------------------------- OBETNER MATERIAS SEGUN SU NIVEL ---------------------------------------------
export const getMateria_nivel = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM materia_nivel WHERE nivel_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Materias of educational level not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//--------------------------------------------- OBETNER UNA MATERIA ---------------------------------------------
export const getMateria = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM materia_nivel WHERE materia_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Materia not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }   
}

//--------------------------------------------- CREAR UNA MATERIA ---------------------------------------------
export const createMateria = async (req, res) => {
    const {nivel_id, nombre, imagen, fecha, autor, descripcion} = req.body

    try {
        const [rows] = await pool.query(`
        INSERT INTO materia_nivel 
        (
            nivel_id, 
            nombre, 
            imagen, 
            fecha, 
            autor, 
            descripcion
        ) 
        VALUES (?, ?, ?, ?, ?, ?)`, 
        [nivel_id, nombre, imagen, fecha, autor, descripcion])
        res.send({
            materia_id: rows.insertId,
            nivel_id, 
            nombre, 
            imagen, 
            fecha, 
            autor, 
            descripcion
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//--------------------------------------------- ACTUALIZAR UNA MATERIA ---------------------------------------------
export const updateMateria = async (req, res) => {
    const {id} = req.params
    const {nivel_id, nombre, imagen, fecha, autor, descripcion} = req.body

    try {
        const [result] = await pool.query(`
        UPDATE materia_nivel 
        SET 
            nivel_id = IFNULL(?, nivel_id), 
            nombre = IFNULL(?, nombre), 
            imagen = IFNULL(?, imagen), 
            fecha = IFNULL(?, fecha), 
            autor = IFNULL(?, autor), 
            descripcion = IFNULL(?, descripcion) 
        WHERE materia_id = ?`, 
        [nivel_id, nombre, imagen, fecha, autor, descripcion, id]
    );
        console.log(result)
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Materia not found'
        })
        const [rows] = await pool.query('SELECT * FROM materia_nivel WHERE materia_id = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//--------------------------------------------- ELIMINAR UNA MATERIA ---------------------------------------------
export const deleteMateria = async (req, res) => {
    const [result] = await pool.query('DELETE FROM materia_nivel WHERE materia_id = ?', [req.params.id])
    if (result.affectedRows <= 0) {
        return res.status(404).json ({
            menssage: 'Materia not found'
        })
    }
    res.sendStatus(204)
}