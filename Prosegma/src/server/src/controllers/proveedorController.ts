import {Request, Response} from 'express';

import db from '../database';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';




class ProveedorController {
    
    value: any;
    values: any;


    public async getCriterios (req: Request, res: Response) {
        console.log('listar Criterios');
        const criterios = await db.query('SELECT * FROM criterios_seleccion');
        return res.json(criterios);
    }

    public async findSuppliers (req: Request, res: Response) {
        console.log('Proveedor', req.body);
        const { identificacion } = req.body;
        const { nombre } = req.body;
        const { estado } = req.body;

        console.log('consultar proveedores' + identificacion + ' ' + nombre + ' ' + estado);

        let sql = ' SELECT distinct p.idproveedor as nit, p.razon_social as nombre, rp.estado as estado, rp.id as id FROM revision_proveedor rp inner join proveedor p on rp.id_proveedor = p.idproveedor where';


        if (identificacion !== null &&  identificacion !== '' && identificacion !== undefined) {
            sql += ' and p.idproveedor = ' + identificacion;
        }
        if (nombre !== null && nombre !== '' && nombre !== undefined) {
            sql += ' p.razon_social like \'%' + nombre + '%\'';
        }
        if (estado !== null && estado !== '' && estado !== undefined) {
            sql += ' and p.estado like \'%' + estado + '%\'';
        }

        sql = sql.indexOf('where and') > 0 ? sql.replace('where and', 'where') : sql;

        console.log('consulta 2--- ' + sql);
        return res.json(await db.query(sql));
    }


    public async saveExistingTask (req: Request, res: Response) {
        const element = req.body;
        console.log('INSERT INTO revision_proveedor SET ?', [element]);
        const respuesta =  await db.query('INSERT INTO revision_proveedor SET ?', [element]);
        return res.json(true);
    }


    public async updateTaskState (req: Request, res: Response) {

        console.log(' update ',  req.body);
        const { documentos } = req.body;
        const { estado } = req.body;
        const { id_proveedor } = req.body;
        const { id } = req.body;

        if (estado.toLowerCase() === 'finalizada') {
          await db.query('UPDATE proveedor SET estado = "aprobado" WHERE idproveedor = ' + id_proveedor);
          console.log(' update docuemntos',  documentos);
          for (let index = 0; index < documentos.length; index++) {
              const element = documentos[index];
              await db.query('UPDATE documentos_inscripcion SET estado = "aceptado" WHERE id = ' + element.id);
          }

          await db.query('UPDATE revision_proveedor SET estado = "finalizado" WHERE id = ' + id);
        }

        if (estado.toLowerCase() === 'activa') {
            for (let index = 0; index < documentos.length; index++) {
                const element = documentos[index];
                await db.query('UPDATE documentos_inscripcion SET estado = "aceptado" WHERE id = ' + element.id);
            }
          }

          if (estado.toLowerCase() === 'reproceso') {
            await db.query('UPDATE proveedor SET estado = "solicitud de cambios en documentos" WHERE idproveedor = ' + id_proveedor);
            for (let index = 0; index < documentos.length; index++) {
                const element = documentos[index];
                await db.query('UPDATE documentos_inscripcion SET estado = "aceptado" WHERE id = ' + element.id);
            }
            // tslint:disable-next-line: max-line-length
            await db.query('UPDATE documentos_inscripcion SET estado = "rechazado" WHERE id_proveedor = ' + id_proveedor + ' AND estado IS NULL');
            await db.query('UPDATE revision_proveedor SET estado = "reproceso" WHERE id = ' + id);

          }

      //  const respuesta =  await db.query('INSERT INTO revision_proveedor SET ?', [element]);
        return res.json(true);
    }



    public async getProveedor (req: Request, res: Response) {
        const { id } = req.params;
        const respuesta = await db.query('SELECT p.estado, i.idinscripcion FROM proveedor p INNER JOIN inscripcion i ON p.idproveedor = i.idproveedor where i.idproveedor =' + id);
        if (respuesta.length > 0) {
            return res.json(respuesta);
        }
        res.status(404).json({text: 'Error al consultar el estado'});
    }

    public async showRejectedDocuments (req: Request, res: Response) {
        const { id } = req.params;
        const respuesta = await db.query(' SELECT distinct  di.id_documento, di.id, sd.nombredocumento, di.estado FROM documentos_inscripcion di INNER JOIN solicitud_documentos sd ON di.id_documento = sd.iddocumentos where id_proveedor = ' + id);
        if (respuesta.length > 0) {
            return res.json(respuesta);
        }
        res.status(404).json({text: 'El Proveedor no tiene documentos registrados'});
    }


    public async updateSeleccion(req: Request, res: Response) {
        const { id } = req.params;
        console.log('update proveedor seleccionado', req.body);
        // tslint:disable-next-line: max-line-length
        for (let index = 0; index < req.body.length; index++) {
            const element = req.body[index];
            if (element !== undefined) {
                // tslint:disable-next-line: max-line-length
                // tslint:disable-next-line: max-line-length
                await db.query('UPDATE datos_seleccion set calificacion_proveedor = "' + element.porcentaje + '", ranking_proveedor = "' + (index + 1) + '" WHERE id_seleccion = ' + id + ' AND id_proveedor = ' + element.nit);
               if(index !== 0){
                    await db.query('UPDATE proveedor set estado = "' + 3 + '" WHERE idproveedor = ' + element.nit);
               }
            }
        }
        res.json({text: 'eliminando usuario'});
    }

   public async saveSeleccionProveedor (req: Request, res: Response) {
        console.log('proveedor seleccionado', req.body[0]);
        const file = req.body;
        // tslint:disable-next-line: max-line-length
        const idSeleccion = await db.query('INSERT INTO seleccion_proveedor (titulo, descripcion, fecha_creacion) values("' +  req.body[0].titulo + '","' +  req.body[0].descripcion + '","' +  req.body[0].fecha_creacion + '")');
        console.log('idSeleccion', idSeleccion.insertId);

        for (let index = 0; index < req.body.length; index++) {
            const element = req.body[index];
            if (element !== undefined) {

               // tslint:disable-next-line: max-line-length
               await db.query('INSERT INTO datos_seleccion (id_seleccion, id_proveedor) values(' + idSeleccion.insertId + ',' + element.nit + ')');

               await db.query('UPDATE proveedor SET estado = 3 WHERE idproveedor = 1');

            }
        }
        // tslint:disable-next-line: max-line-length
       return res.json({text: 'documentos_inscripcion guardado exitosamente', id: idSeleccion.insertId});
     }

   public delete (req: Request, res: Response) {
    res.json({text: 'eliminando usuario'});
}

public update (req: Request, res: Response) {
    res.json({text: 'actualizando usuario ' + req.params.id});
}
}

export const proveedorController = new ProveedorController();
