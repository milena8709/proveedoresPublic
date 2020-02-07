import { Router } from 'express';

import {usuarioController} from '../controllers/usuarioController';
import { camposProveedorController } from '../controllers/camposproveedorController';

class CamposProveedorRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router camposProveedor');
this.config();

    }

    config(): void {
        this.router.get('/', camposProveedorController.list);
        this.router.get('/:id', camposProveedorController.getCamposById);
        this.router.post('/', camposProveedorController.create);
        this.router.put('/:id', camposProveedorController.update);
        this.router.delete('/:id', camposProveedorController.delete);
    }
}

const camposProveedorRoutes = new CamposProveedorRoutes();
export default camposProveedorRoutes.router;

