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
        'INSERT INTO coleccion_recurso (colecciones_id, recurso_id,titulo, descripcion,url, image_url, recurso_tipo) VALUES (?, ?, ?, ? , ? , ? , ?)',
        [coleccion_id, resource.id,resource.titulo,resource.descripcion,resource.url,resource.image_url, resource.type]
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

export const obtenerColeccionesPublicas = async (req, res) => {
  try {
      const [rows] = await pool.query(
          `SELECT c.coleccion_id, c.nombre, u.username AS usuario_nombre
           FROM coleccion c
           JOIN users u ON c.usuario_id = u.id
           WHERE c.es_privado = TRUE`
      );
      
      res.status(200).json(rows);
  } catch (error) {
      console.error('Error al obtener colecciones públicas:', error);
      return res.status(500).json({
          message: 'Algo salió mal :('
      });
  }
};

export const obtenerRecursosDeColeccion = async (req, res) => {
  const { coleccion_id } = req.params;

  try {
      const [rows] = await pool.query(
          `SELECT recurso_id, titulo, descripcion, url, image_url, recurso_tipo FROM coleccion_recurso WHERE colecciones_id = ?`,
          [coleccion_id]
      );
      
      res.status(200).json(rows);
  } catch (error) {
      console.error('Error al obtener recursos de la colección:', error);
      return res.status(500).json({
          message: 'Algo salió mal :('
      });
  }
};

export const obtenerColeccionesPrivadas = async (req, res) => {
  try {
      const usuario_id = req.user.id;
      const [rows] = await pool.query(
          `SELECT coleccion_id, nombre FROM coleccion WHERE usuario_id = ? AND es_privado = FALSE`,
          [usuario_id]
      );
      
      res.status(200).json(rows);
  } catch (error) {
      console.error('Error al obtener colecciones privadas:', error);
      return res.status(500).json({
          message: 'Algo salió mal :('
      });
  }
};

export const eliminarColeccion = async (req, res) => {
  const { coleccion_id } = req.params;
  const usuario_id = req.user.id;

  try {
    await pool.query(
      `DELETE FROM coleccion_recurso WHERE colecciones_id = ?`,
      [coleccion_id]
    );

    const [result] = await pool.query(
      `DELETE FROM coleccion WHERE coleccion_id = ? AND usuario_id = ?`,
      [coleccion_id, usuario_id]
    );

    res.status(200).json({ message: 'Colección eliminada exitosamente' });
  } catch (error) {
     console.error('Error al eliminar la colección:', error);
    return res.status(500).json({
      message: 'Error interno al intentar eliminar la colección'
    });
  }
};


export const eliminarRecursoDeColeccion = async (req, res) => {
  const { coleccion_id, recurso_id } = req.params;
  const usuario_id = req.user.id; 

  try {
      const [coleccion] = await pool.query(
          `SELECT coleccion_id FROM coleccion WHERE coleccion_id = ? AND usuario_id = ?`,
          [coleccion_id, usuario_id]
      );

      // if (coleccion.length === 0) {
      //     return res.status(404).json({ message: 'Colección no encontrada o no tienes permiso para modificarla' });
      // }
      const [result] = await pool.query(
          `DELETE FROM coleccion_recurso WHERE colecciones_id = ? AND recurso_id = ?`,
          [coleccion_id, recurso_id]
      );

      // if (result.affectedRows === 0) {
      //     return res.status(404).json({ message: 'Recurso no encontrado en la colección' });
      // }

      res.status(200).json({ message: 'Recurso eliminado de la colección exitosamente' });
  } catch (error) {
      console.error('Error al eliminar el recurso de la colección:', error);
      return res.status(500).json({
          message: 'Algo salió mal :('
      });
  }
};
