import express, {Application} from 'express';
import routerUser from '../routers/user';
import { User } from './user';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }

    routes() {
        this.app.use('/api/users', routerUser);
    }
  
    middlewares() {
        this.app.use(express.json());
    }

    async dbConnect() {
        try {
            await User.sync();
            console.log('Conexión ha sido establecida con éxito');
        } catch (error) {
            console.log('Conexión fallida con la base de datos', error);
        }
    }
}

module.exports = Server;
