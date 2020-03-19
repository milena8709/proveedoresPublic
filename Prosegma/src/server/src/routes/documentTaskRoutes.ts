import { Router } from 'express';
import { proveedorController } from '../controllers/proveedorController';

class DocumentTaskRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router DocumentTaskRoutes');
        this.config();

    }

    config(): void {
        this.router.post('', proveedorController.saveExistingTask);
        this.router.put('', proveedorController.updateTaskState);
        this.router.get('/:id', proveedorController.showRejectedDocuments);

    }
}

const documentTaskRoutes = new DocumentTaskRoutes();
export default documentTaskRoutes.router;

