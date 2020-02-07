import { Router } from 'express';
import { camposProveedorController } from '../controllers/camposproveedorController';



class IndexRoutes {

    public router: Router = Router();

    constructor() {
this.config();

    }

    config(): void {
      //  this.router.get('/', camposProveedorController.list);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;

