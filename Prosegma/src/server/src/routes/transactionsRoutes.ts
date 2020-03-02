import { Router } from 'express';
import { transactionsController } from '../controllers/transactionsController';

class TransactionsRoutes {

    public router: Router = Router();

    constructor() {
        console.log('ingreso al router evaluationController');
        this.config();

    }

    config(): void {
        this.router.get('/', transactionsController.getMaterials);
        this.router.get('/getMaterial/:segmento/:familia/:clase/:producto/', transactionsController.getMaterialsByFilters);
        this.router.get('/getTransaction', transactionsController.getTransactions);
        this.router.post('/', transactionsController.createTransaction);
        // tslint:disable-next-line: max-line-length
        this.router.get('/getTransaction/:estado/:fecha_limite_entrega/:idproveedor/:id_orden_compra/', transactionsController.findTransactionByFilter);
        this.router.get('/getTransactionUpdate/:id', transactionsController.getTransactionToUpdate);
        this.router.put('/updateTransaction', transactionsController.updateTransaction);
        // this.router.get('/id', evaluationController.getProveedorById);
        // this.router.post('/', evaluationController.createEvaluation);
        // this.router.put('/:id', camposProveedorController.update);
        // this.router.delete('/:id', camposProveedorController.delete);
    }
}

const transactionsRoutes = new TransactionsRoutes();
export default transactionsRoutes.router;