import { Router } from 'express';

import { providersController } from '../controllers/providersController';

class ProvidersRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router evaluationController');
        this.config();

    }

    config(): void {
        this.router.get('/:id/:name/', providersController.getProveedorById);
    }
}

const providersRoutes = new ProvidersRoutes();
export default providersRoutes.router;