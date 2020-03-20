import { Router } from 'express';
import { proveedorController } from '../controllers/proveedorController';
import { usuarioController } from '../controllers/usuarioController';
import { perfilController } from '../controllers/perfilController';

class PerfilRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router perfilRoutes');
        this.config();

    }

    config(): void {
        this.router.get('/', perfilController.list);
    }
}

const perfilRoutes = new PerfilRoutes();
export default perfilRoutes.router;

