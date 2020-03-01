import {Request, Response} from 'express';

import db from '../database';

class TransactionsController {


    public async getMaterialsByFilters (req: Request, res: Response) {
        let segmento  = req.params.segmento;
        let familia = req.params.familia;
        let clase  = req.params.clase;
        let producto = req.params.producto;
        if ( segmento === ' ' || segmento === null || req.params.segmento == undefined) {
            segmento = '';
        }
        if ( clase === ' ' || clase === null || req.params.clase == undefined) {
            clase = '';
        }
        if ( familia === ' ' || familia === null || req.params.familia == undefined) {
            familia = '';
        }
        if ( producto === ' ' || producto === null || req.params.producto == undefined) {
            producto = '';
        }
        console.log('segmento : ' + segmento);
        console.log('clase : ' + clase);
        const materiales =  await db.query(`SELECT seg.codigoSegmento, seg.nombreSegmento, fam.codigoFamilia, fam.nombreFamilia, cls.codigoclase, cls.nombreClase, pro.codigoproducto, pro.nombreproducto FROM producto pro INNER JOIN clase cls ON pro.idclase = cls.codigoclase INNER JOIN familia fam ON fam.codigoFamilia = pro.id_familia INNER JOIN segmento seg ON seg.codigoSegmento = pro.id_segmento WHERE seg.nombreSegmento LIKE '%${segmento}%' AND fam.nombreFamilia LIKE '%${familia}%' AND cls.nombreClase LIKE '%${clase}%' AND pro.nombreproducto LIKE '%${producto}%'`);
        if (materiales.length > 0) {
            return res.json(materiales);
        }
        return res.status(404).json({text: 'El material no existe'});
    }

    public async getMaterials (req: Request, res: Response) {
        console.log('Entra aqui');
        const materiales =  await db.query('SELECT seg.codigoSegmento, seg.nombreSegmento, fam.codigoFamilia, fam.nombreFamilia, cls.codigoclase, cls.nombreClase, pro.codigoproducto, pro.nombreproducto FROM producto pro INNER JOIN clase cls ON pro.idclase = cls.codigoclase INNER JOIN familia fam ON fam.codigoFamilia = pro.id_familia INNER JOIN segmento seg ON seg.codigoSegmento = pro.id_segmento LIMIT 5');
        if (materiales.length > 0) {
            return res.json(materiales);
        }
        res.status(404).json({text: 'No existen Materiales'});
    }

    public async createTransaction (req: Request, res: Response): Promise<void> {
        // tslint:disable-next-line: forin
        console.log(req);
        let descripcion = req.body.description;
        if (descripcion == null) {
            descripcion = '';
        }
        let fecha = req.body.fechalimite;
        if (fecha == null) {
            fecha = '';
        }
        let idOrden = req.body.idorden;
        if (idOrden == null) {
            idOrden = '';
        }
        let idProveedor = req.body.idproveedor;
        if (idProveedor == null) {
            idProveedor = '';
        }
        let estado = 'En proceso';
        if (estado == null) {
            estado = '';
        }
        let rutaOrden = 'C:/sf/';
        if (rutaOrden == null) {
            rutaOrden = '';
        }
        let observacion = '';
        if (observacion == null) {
            observacion = '';
        }
        // tslint:disable-next-line: max-line-length
        await db.query('INSERT INTO transacciones (descripcion,id_proveedor,fecha_limite_entrega,id_orden_compra,ruta_orden_compra,estado,observacion) VALUES (?,?,?,?,?,?,?)', [descripcion, idProveedor, fecha, idOrden, rutaOrden, estado, observacion]);
        const id_transacion =  await db.query('SELECT id FROM transacciones where descripcion = ? AND id_proveedor = ? AND fecha_limite_entrega = ? AND id_orden_compra = ? AND ruta_orden_compra = ? AND estado = ?',[descripcion, idProveedor, fecha, idOrden, rutaOrden, estado]);
        console.log('transaccion :: ' + JSON.stringify(id_transacion[0].id));
        console.log('Materiales :: ' + req.body.materiales.length);
            for (let i = 0; i < req.body.materiales.length; i++) {

                const idproducto = req.body.materiales[i].idproducto;
                const cantidad_esperada = req.body.materiales[i].cantidad_esperada;
                const unidades = req.body.materiales[i].unidades;
                console.log('cantidad_esperada :: ' + cantidad_esperada);
                // tslint:disable-next-line: max-line-length
                await db.query('INSERT INTO datos_transaccion (id_transaccion,id_producto,cantidad_esperada,unidades) VALUES (?,?,?,?)', [id_transacion[0].id, idproducto, cantidad_esperada, unidades]);
            }
        res.json({text: 'evaluacion guardado exitosamente'});
    }

    public async findTransactionByFilter (req: Request, res: Response) {
        console.log('findTransactionByFilter : ' + req);
        let estado = req.params.estado;
        if (estado === ' ' || req.params.estado == undefined) {
            estado = '';
        }
        let fecha_limite_entrega = req.params.fecha_limite_entrega;
        if (fecha_limite_entrega === ' ' || req.params.fecha_limite_entrega == undefined) {
            fecha_limite_entrega = '';
        }
        let idproveedor = req.params.idproveedor;
        if (idproveedor === ' ' || req.params.idproveedor == undefined) {
            idproveedor = '';
        }
        let id_orden_compra = req.params.id_orden_compra;
        if (id_orden_compra === ' ' || req.params.id_orden_compra == undefined) {
            id_orden_compra = '';
        }
        console.log('Entra a buscar las transacciones');
        const transacciones =  await db.query(`SELECT tra.id, tra.descripcion, tra.fecha_limite_entrega, tra.id_orden_compra, tra.estado, tra.id_proveedor, pro.razon_social FROM transacciones tra INNER JOIN proveedor pro ON tra.id_proveedor = pro.idproveedor WHERE tra.estado LIKE '%${estado}%' AND tra.fecha_limite_entrega LIKE '%${fecha_limite_entrega}%' AND tra.id_proveedor LIKE '%${idproveedor}%' AND tra.id_orden_compra LIKE '%${id_orden_compra}%'`);
        if (transacciones.length > 0) {
            return res.json(transacciones);
        }
        res.status(404).json({text: 'No existen Materiales'});
    }

    public async getTransactions (req: Request, res: Response) {
        const transacciones =  await db.query(`SELECT tra.id, tra.descripcion, tra.fecha_limite_entrega, tra.id_orden_compra, tra.estado, tra.id_proveedor, pro.razon_social FROM transacciones tra INNER JOIN proveedor pro ON tra.id_proveedor = pro.idproveedor LIMIT 3`);
        if (transacciones.length > 0) {
            return res.json(transacciones);
        }
        res.status(404).json({text: 'No existen Materiales'});
    }

    public async getTransactionToUpdate (req: Request, res: Response) {
        const id = req.params.id;
        const transaccion =  await db.query(`SELECT tra.id, tra.descripcion, tra.fecha_limite_entrega, tra.id_orden_compra, tra.estado, tra.id_proveedor, pro.razon_social, dat.id_producto, elem.nombreproducto, dat.cantidad_esperada, dat.cantidad_recibida, dat.unidades FROM datos_transaccion dat INNER JOIN transacciones tra ON tra.id = dat.id_transaccion INNER JOIN  proveedor pro ON tra.id_proveedor = pro.idproveedor INNER JOIN producto elem ON dat.id_producto = elem.codigoproducto WHERE tra.id = ${id}`);
        if (transaccion.length > 0) {
            return res.json(transaccion);
        }
        res.status(404).json({text: 'No existe la transaccion'});
    }


    public async updateTransaction (req: Request, res: Response): Promise<void> {
        // tslint:disable-next-line: forin
        console.log(req);
        let descripcion = req.body.description;
        if (descripcion == null) {
            descripcion = '';
        }
        let fecha = req.body.fechalimite;
        if (fecha == null) {
            fecha = '';
        }
        let idOrden = req.body.idorden;
        if (idOrden == null) {
            idOrden = '';
        }
        let idProveedor = req.body.idproveedor;
        if (idProveedor == null) {
            idProveedor = '';
        }
        let estado = 'pendiente';
        if (estado == null) {
            estado = '';
        }
        let rutaOrden = 'C:/sf/';
        if (rutaOrden == null) {
            rutaOrden = '';
        }
        let observacion = '';
        if (observacion == null) {
            observacion = '';
        console.log('Materiales :: ' + req.body.materiales.length);
        for (let i = 0; i < req.body.materiales.length; i++) {

            const cantidad_recibida ='';
            const aprobacion_calidad ='';
            const observacion = '';
            const idtransaccion = req.body.materiales[i].idproducto;
            const id_producto = req.body.materiales[i].cantidad_esperada;
            const id = req.body.materiales[i].unidades;
            // console.log('cantidad_esperada :: ' + cantidad_esperada);
            // tslint:disable-next-line: max-line-length
            await db.query('UPDATE datos_transaccion, transacciones SET datos_transaccion.cantidad_recibida = ?, datos_transaccion.aprobacion_calidad = ?, datos_transaccion.observacion = ?, transacciones.estado = ? WHERE datos_transaccion.id_transaccion = ? AND datos_transaccion.id_producto = ? AND transacciones.id = ?'/*, [id_transacion[0].id, idproducto, cantidad_esperada, unidades]*/);
        }
        res.json({text: 'evaluacion guardado exitosamente'});
        }
    }
}

export const transactionsController = new TransactionsController();