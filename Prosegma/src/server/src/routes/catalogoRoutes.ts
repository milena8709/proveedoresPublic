import { Router } from 'express';

import {usuarioController} from '../controllers/usuarioController';
import { catalagoController } from '../controllers/catalogosController';

class CamposProveedorRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router catalogos');
this.config();

    }

    config(): void {
   //     this.router.get('/', catalagoController.getCatalogoById);
        this.router.get('/:id', catalagoController.getCatalogoById);
//        this.router.post('/', camposProveedorController.create);
//        this.router.put('/:id', camposProveedorController.update);
//        this.router.delete('/:id', camposProveedorController.delete);
    }
}

const camposProveedorRoutes = new CamposProveedorRoutes();
export default camposProveedorRoutes.router;

