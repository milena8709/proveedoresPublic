import { Router } from 'express';
import { seleccionController } from '../controllers/seleccionController';
import { proveedorController } from '../controllers/proveedorController';

class ProveedorRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router ProveedorRoutes');
        this.config();

    }

    config(): void {
        this.router.get('/:id', proveedorController.getProveedor);
    }
}

const proveedorRoutes = new ProveedorRoutes();
export default proveedorRoutes.router;

