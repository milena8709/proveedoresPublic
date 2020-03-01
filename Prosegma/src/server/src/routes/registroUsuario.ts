import { Router } from 'express';

import {usuarioController} from '../controllers/usuarioController';

class RegistroUsuario {

    public router: Router = Router();

    constructor() {
     this.config();
    }

    config(): void {
        this.router.get('/:usuario/:password', usuarioController.getUsuario);
        this.router.post('/', usuarioController.create);
        this.router.put('/:idusuario', usuarioController.update);
        this.router.get('/:id', usuarioController.getProveedorById);
        // this.router.get('/', usuarioController.);
        /*this.router.post('/', usuarioController.create);
        this.router.put('/:id', usuarioController.update);
        this.router.delete('/:id', usuarioController.delete);*/
    }
}

const registroUsuario = new RegistroUsuario();
export default registroUsuario.router;

