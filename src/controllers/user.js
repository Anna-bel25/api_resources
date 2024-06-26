import bcrypt from 'bcrypt';
// import { User } from "../models/user-model.js";
import jwt from 'jsonwebtoken';
import { pool } from "../db.js" // Asegúrate de importar el pool de conexión

//------------NEW USER---------------
export const newUser = async (req, res) => {
    console.log(req.body);
    const { tipocuenta, username, correo, password } = req.body;

    try {
        // Validamos si el usuario ya existe en la base de datos
        const [existingUserRows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUserRows.length > 0) {
            return res.status(400).json({
                message: 'Ya existe el usuario con el nombre ' + username 
            });
        }
        // Mostrar datos recibidos en el log
        console.log('Datos recibidos del frontend:');
        console.log('Tipo de Cuenta:', tipocuenta);
        console.log('Nombre de Usuario:', username);
        console.log('Correo:', correo);
        // Encriptamos la contraseña
        console.log('Contraseña sin encriptar:', password); // Registro para verificar la contraseña antes de encriptar
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Contraseña encriptada:', hashedPassword);

        // Guardamos usuario en la base de datos
        const [result] = await pool.query(`
            INSERT INTO users (tipocuenta, username, correo, password) 
            VALUES (?, ?, ?, ?)`,
            [tipocuenta, username, correo, hashedPassword]
        );

        res.json({
            user_id: result.insertId,
            tipocuenta,
            username,
            correo,
            message: 'Usuario ' + username + ' creado exitosamente!'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Upps, ocurrió un error',
            error: error.message
        });
    }
};

//------------LOGIN---------------
export const loginUser = async (req, res) => {
    const { correo, password } = req.body;

    try {
        // Validamos si el usuario existe en la base de datos
        const [userRows] = await pool.query('SELECT * FROM users WHERE correo = ?', [correo]);
        if (userRows.length === 0) {
            return res.status(400).json({
                message: 'No existe un usuario con el correo ' + correo + ' en la base de datos'
            });
        }
        // Mostrar datos recibidos en el log
        console.log('Datos recibidos del frontend:');
        console.log('Correo:', correo);
        console.log('Contraseña sin encriptar:', password);

        const user = userRows[0];

        // Validamos password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                message: 'Contraseña Incorrecta'
            });
        }

        // Generamos token
        const token = jwt.sign(
            { id: user.id,correo: correo },
            process.env.SECRET_KEY || 'pepito123'
        );

        res.json({ token });
    } catch (error) {
        return res.status(500).json({
            message: 'Upps, ocurrió un error',
            error: error.message
        });
    }
};
