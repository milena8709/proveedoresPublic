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
        this.router.get('/', evaluationController.list);
        // this.router.get('/id', evaluationController.getProveedorById);
        this.router.post('/', evaluationController.createEvaluation);
        this.router.get('/getEvaluacion/:id/:razon_social/:year/:semester/', evaluationController.getEvaluation);
        this.router.get('/getEvaluacionByDetail/:id/:titulo/:year/', evaluationController.getEvaluationByDetail);
        /*this.router.put('/:id', camposProveedorController.update);
        this.router.delete('/:id', camposProveedorController.delete);*/
    }
}

const evaluationRoutes = new EvaluationRoutes();
export default evaluationRoutes.router;