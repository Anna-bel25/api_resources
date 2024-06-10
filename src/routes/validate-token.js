import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    console.log(headerToken);

    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            // console.log(bearerToken)
            const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            req.user = decoded; 
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Token no válido'
            });
        }
    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
};

export default validateToken;
