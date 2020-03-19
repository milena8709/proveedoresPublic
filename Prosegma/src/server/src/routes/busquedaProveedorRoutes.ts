import { Router } from 'express';
import { seleccionController } from '../controllers/seleccionController';
import { proveedorController } from '../controllers/proveedorController';

class BusquedaProveedorRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router BusquedaProveedorRoutes');
        this.config();

    }

    config(): void {
        this.router.post('/', proveedorController.findSuppliers);
        this.router.get('/:id', proveedorController.showRejectedDocuments);
    }
}

const busquedaProveedorRoutes = new BusquedaProveedorRoutes();
export default busquedaProveedorRoutes.router;

