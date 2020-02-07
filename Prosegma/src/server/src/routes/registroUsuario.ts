import { Router } from 'express';

import {usuarioController} from '../controllers/usuarioController';

class RegistroUsuario {

    public router: Router = Router();

    constructor() {
this.config();

    }

    config(): void {
      /*  this.router.get('/', usuarioController.list);
        this.router.get('/:id', usuarioController.getUsuarioById);
        this.router.post('/', usuarioController.create);
        this.router.put('/:id', usuarioController.update);
        this.router.delete('/:id', usuarioController.delete);*/
    }
}

const registroUsuario = new RegistroUsuario();
export default registroUsuario.router;

