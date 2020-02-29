import { Router } from 'express';
import { seleccionController } from '../controllers/seleccionController';



class SaveSeleccionRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router camposProveedor');
        this.config();

    }

    config(): void {
        this.router.post('/', seleccionController.saveSeleccionProveedor);
        this.router.put('/:id', seleccionController.updateSeleccion);

    }
}

const saveSeleccionRoutes = new SaveSeleccionRoutes();
export default saveSeleccionRoutes.router;

