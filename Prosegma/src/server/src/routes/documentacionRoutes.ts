import { Router } from 'express';

import { documentacionController } from '../controllers/documentacionController';
import { CamposproveedorService } from '../../../services/camposproveedor.service';

class DocumentacionRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router camposProveedor');
        this.config();
    }

    config(): void {
        this.router.get('/', documentacionController.list);
        this.router.get('/:id', documentacionController.getCamposById);
        this.router.post('/', documentacionController.create);
        this.router.put('/:id', documentacionController.update);
        this.router.delete('/:id', documentacionController.delete);
    }

    

}

const documentacionRoutes = new DocumentacionRoutes();
export default documentacionRoutes.router;

