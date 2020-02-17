import { Router } from 'express';

import {usuarioController} from '../controllers/usuarioController';

import { evaluationController } from '../controllers/evaluationcontroller';

class EvaluationRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router evaluationController');
this.config();

    }

    config(): void {
        this.router.get('/proveedores', evaluationController.list);
        /*this.router.get('/:id', camposProveedorController.getCamposById);
        this.router.post('/', camposProveedorController.create);
        this.router.put('/:id', camposProveedorController.update);
        this.router.delete('/:id', camposProveedorController.delete);*/
    }
}

const evaluationRoutes = new EvaluationRoutes();
export default evaluationRoutes.router;