import {Request, Response} from 'express';


import db from '../database';


class UsuarioController {



    public async list (req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM usuarios');
        res.json(usuarios);
    }

    public async getUsuario (req: Request, res: Response) {
        const { usuario } = req.params;
        const { password } = req.params;

        console.log('usuario -', 'SELECT * FROM usuarios where usuario = "' + usuario + '" and clave = "' + password + '"');
        const usuarios =  await db.query('SELECT * FROM usuarios where usuario = "' + usuario + '" and clave = "' + password + '"');
        if (usuarios.length > 0) {
            return res.json(usuarios[0]);
        } else {
            return res.status(404).json({text: 'El usuario no existe, o sus credenciales no coinciden, por favor revise nuevamente'});
        }
    }

    public async getUsuarioById (req: Request, res: Response) {
        const { id } = req.params;
        console.log(id);
        const usuarios =  await db.query('SELECT * FROM usuarios where idusuario = ?', [id]);
        if (usuarios.length > 0) {
            return res.json(usuarios[0]);
        }
        res.status(404).json({text: 'El usuario no existe'});
    }


   public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        // tslint:disable-next-line: max-line-length
        await db.query('INSERT INTO proveedor (idproveedor, razon_social) values ("' + req.body.nit + '","' + req.body.razon_social + '")');
        // tslint:disable-next-line: max-line-length
        await db.query('INSERT INTO usuarios (usuario, clave, idperfil,id_proveedor,correo) values ("' + req.body.nit + '", "' + req.body.clave + '",1, "' + req.body.nit + '", "'+req.body.correo+'")');
        res.json({text: 'Usuario guardado exitosamente'});
    }

   public delete (req: Request, res: Response) {
    res.json({text: 'eliminando usuario'});
}

public update (req: Request, res: Response) {
    res.json({text: 'actualizando usuario ' + req.params.id});
}
}

export const usuarioController = new UsuarioController();
