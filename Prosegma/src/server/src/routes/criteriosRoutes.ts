import { Router } from 'express';
import {usuarioController} from '../controllers/usuarioController';
import { criteriosController } from '../controllers/criteriosController';

class CriteriosRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router criterioRoutes');
        this.config();

    }

    config(): void {

        this.router.get('/', criteriosController.getEvaluation);
        /*this.router.put('/:id', camposProveedorController.update);
        this.router.delete('/:id', camposProveedorController.delete);*/
    }
}

const criteriosRoutes = new CriteriosRoutes();
export default criteriosRoutes.router;