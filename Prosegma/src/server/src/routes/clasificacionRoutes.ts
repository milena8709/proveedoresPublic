import { Router } from 'express';

import { clasificacionController } from '../controllers/clasificacionController';

class ClasificacionRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router camposProveedor');
this.config();

    }

    config(): void {
        this.router.get('/', clasificacionController.list);
        this.router.post('/', clasificacionController.getClasificacionByFiltros);
        this.router.post('/save', clasificacionController.saveClasificacion);
        this.router.put('/:id', clasificacionController.update);
        this.router.delete('/:id', clasificacionController.delete);
    }
}

const clasificacionRoutes = new ClasificacionRoutes();
export default clasificacionRoutes.router;

