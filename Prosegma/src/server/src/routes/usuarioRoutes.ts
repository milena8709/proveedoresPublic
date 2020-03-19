import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController';


class UsuarioRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router usuarioRoutes');
        this.config();

    }

    config(): void {
        this.router.post('/', usuarioController.CreateNewAccounten);
        this.router.get('/', usuarioController.list);
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;

