import { Router } from 'express';
import { seleccionController } from '../controllers/seleccionController';

class SeleccionRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router seleccionRoutes');
        this.config();

    }

    config(): void {
        this.router.post('/', seleccionController.getSeleccionProveedor);
        this.router.get('/', seleccionController.getCriterios);

    }
}

const seleccionRoutes = new SeleccionRoutes();
export default seleccionRoutes.router;

