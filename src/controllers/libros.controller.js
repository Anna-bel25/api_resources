import { pool } from "../db.js"


// Obtener todos los actividades
export const getLibros = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_libro');
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'No libro found'
            });
        }
        res.json(rows);
    } catch (error) {
        console.error('Error fetching libro:', error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};


//OBETNER LIBRO SEGUN SU MATERIA
export const getLibro_materia = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_libro WHERE materia_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Libros of materia not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//OBETNER UN ACTIVIDAD
export const getLibro = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recurso_libro WHERE libro_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Libro not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }   
}


export const createLibro = async (req, res) => {
    const {materia_id, titulo, imagen_url, url, autor, edicicon, fecha, descripcion, nivel, materia} = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO recurso_libro (materia_id, titulo, imagen_url, url, autor, edicicon, fecha, descripcion, nivel, materia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [materia_id, titulo, imagen_url, url, autor, edicicon, fecha, descripcion, nivel, materia]
        );
        
        res.status(201).json({
            libro_id: result.insertId,
            materia_id, 
            titulo,
            imagen_url,
            url,
            autor,
            edicicon,
            fecha,
            descripcion, 
            nivel, 
            materia
        });
    } catch (error) {
        console.error('Error creating libro:', error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};



export const updateLibro = async (req, res) => {
    const {id} = req.params
    const {materia_id, titulo, imagen_url, url, autor, edicicon, fecha, descripcion, nivel, materia} = req.body

    try {
        const [result] = await pool.query('UPDATE recurso_libro SET materia_id = IFNULL(?, materia_id), titulo = IFNULL(?, titulo), imagen_url = IFNULL(?, imagen_url), url = IFNULL(?, url), autor = IFNULL(?, autor), edicicon = IFNULL(?, edicicon), fecha= IFNULL(?, fecha), descripcion = IFNULL(?, descripcion), nivel = IFNULL(?, nivel), materia = IFNULL(?, materia) WHERE video_id = ?', [materia_id, titulo, imagen_url, url, autor, edicicon, fecha, descripcion, nivel, materia, id])
        console.log(result)
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Libro not found'
        })
        const [rows] = await pool.query('SELECT * FROM recurso_libro WHERE libro_id = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}


export const deleteLibro = async (req, res) => {
    const [result] = await pool.query('DELETE FROM recurso_libro WHERE libro_id = ?', [req.params.id])
    if (result.affectedRows <= 0) {
        return res.status(404).json ({
            menssage: 'Libro not found'
        })
    }
    res.sendStatus(204)
}