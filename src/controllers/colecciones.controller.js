import { pool } from "../db.js";

export const crearColeccion = async (req, res) => {
    const { nombre, es_privado } = req.body;
    const usuario_id = req.user.id; // Obtener el user_id del token del usuario autenticado

    try {
        const esPrivado = es_privado ? 1 : 0;
        console.log('Datos recibidos:', { nombre, es_privado, usuario_id });

        const [result] = await pool.query(
            `INSERT INTO coleccion (usuario_id, nombre, es_privado) VALUES (?, ?, ?)`,
            [usuario_id, nombre, es_privado]
        );

        res.status(201).json({
            coleccion_id: result.insertId,
            usuario_id, 
            nombre, 
            es_privado: esPrivado
        });
    } catch (error) {
        console.error('Error al crear colección:', error);
        return res.status(500).json({
            message: 'Algo salió mal :('
        });
    }
};

export const obtenerColecciones = async (req, res) => {
  const usuario_id = req.user.id; 

  try {
      const [rows] = await pool.query(
          `SELECT coleccion_id, nombre FROM coleccion WHERE usuario_id = ?`,
          [usuario_id]
      );
      
      res.status(200).json(rows);
  } catch (error) {
      console.error('Error al obtener colecciones del usuario:', error);
      return res.status(500).json({
          message: 'Algo salió mal :('
      });
  }
};

export const guardarRecursoEnColeccion = async (req, res) => {
  const { resource, colecciones } = req.body;
  const usuario_id = req.user.id;

  if (!resource || !colecciones || !Array.isArray(colecciones) || colecciones.length === 0) {
    return res.status(400).json({ message: 'Datos inválidos' });
  }

  try {
    for (const coleccion_id of colecciones) {
      await pool.query(
        'INSERT INTO coleccion_recurso (colecciones_id, recurso_id, recurso_tipo) VALUES (?, ?, ?)',
        [coleccion_id, resource.id, resource.type]
      );
    }

    res.status(200).json({ message: 'Recurso guardado en las colecciones' });
  } catch (error) {
    console.error('Error al guardar el recurso en la colección:', error);
    return res.status(500).json({
      message: 'Error al guardar el recurso en la colección'
    });
  }
};