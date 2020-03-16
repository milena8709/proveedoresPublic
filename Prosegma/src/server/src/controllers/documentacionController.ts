import {Request, Response} from 'express';

import db from '../database';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());


class DocumentacionController {
    value: any;
    values: any;

    public async list (req: Request, res: Response) {
        console.log('listar usuarios documentacion');
        const usuarios = await db.query('SELECT * FROM usuarios');
        return res.json(usuarios);
    }

    public async getsolicitudCamposById (req: Request, res: Response) {
        const { id } = req.params;
        const { estado } = req.params;
        console.log('consultar documentos' + id + ' - ' + estado);
        const clasificiones =  await db.query('SELECT * FROM clasificacion where idInscripcion  = ?', [id]);
        if (clasificiones.length > 0) {
           let documentos: any = [];
           console.log('tamdocumento' + clasificiones.length);
            for (const clasificacion of clasificiones) {
                // if (clasificacion.codigoSegmento !== '') {
                    // tslint:disable-next-line: prefer-const
                    // tslint:disable-next-line: max-line-length
                    let sql = 'SELECT * FROM solicitud_documentos sd';
                    if (estado !== 'null' && estado !== undefined && estado !== '0') {
                        sql = sql + ' inner join documentos_inscripcion di ON sd.iddocumentos = di.id_documento';
                        sql = sql + ' where di.estado like "' + estado + '" AND ';
                    } else {
                        sql = sql + ' where';
                    }

                    if (clasificacion.codigoSegmento !== '') {
                        sql = sql + ' (sd.codigoSegmento = ' + clasificacion.codigoSegmento;
                    }
                    if (clasificacion.codigoFamilia !== '') {
                        sql = sql + ' OR sd.codigoFamilia = ' + clasificacion.codigoFamilia;
                    }
                    if (clasificacion.codigoClase !== '') {
                        sql = sql + ' OR sd.codigoClase = ' + clasificacion.codigoClase;
                    }
                    if (clasificacion.codigoProducto !== '') {
                        sql = sql + ' OR sd.codigoProducto = ' + clasificacion.codigoProducto + ')';
                    }
                    if (estado !== 'null' && estado !== undefined && estado !== '0') {
                        sql = sql + ' AND di.id_inscripcion = ' + id;
                    }
                    console.log('consulta documentacionController.ts ', sql);
                    documentos =  await db.query(sql);
            }

            documentos = documentos.filter((valorActual: any, indiceActual: any, arreglo: any[]) => {
                // tslint:disable-next-line: max-line-length
            return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual;
            });

            return res.json(documentos);
        } else {
            res.status(404).json({text: 'No existen documentos configurados'});
        }
    }


    public async getInscripcion (req: Request, res: Response) {
        const id =  await db.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
        if (id.length > 0) {
            return res.json(id);
        }
        res.status(404).json({text: 'El campo no existe'});
    }


   public async create (req: Request, res: Response): Promise<void> {
        const file = req.body;
        console.log('TAMAÑO DE DOCUMENTOS ', req.body);
        let idinscripcion;
        for (let index = 0; index < req.body.length; index++) {
            const element = req.body[index];
            console.log('documentos', element);
            console.log('index', index);

            if (element !== undefined) {
                element.ruta_documento += '/';
                // tslint:disable-next-line: max-line-length
                const sql = 'select * from documentos_inscripcion where id_documento = ' + element.id_documento + ' and id_inscripcion = ' + element.id_inscripcion;
                const existeDoc = await db.query(sql);
                console.log('codimentos insert ---------------', existeDoc.length);
                if (existeDoc != null && existeDoc.length > 0) {
                    console.log('docu ', existeDoc[0].id);
                    if (existeDoc[0].id !== undefined && existeDoc[0].id !== null && existeDoc[0].id !== '') {
                        // tslint:disable-next-line: max-line-length
                    //    console.log('UPDATE documentos_inscripcion SET ruta_documento = "' + element.ruta_documento + '", estado = "renovado" WHERE id_documento = ' + element.id_documento + ' AND id_inscripcion = ' + element.id_inscripcion);
                     // tslint:disable-next-line: max-line-length
                        await db.query('UPDATE documentos_inscripcion SET ruta_documento = "' + element.ruta_documento + '", estado = "renovado" WHERE id_documento = ' + element.id_documento + ' AND id_inscripcion = ' + element.id_inscripcion);
                        await db.query('UPDATE revision_proveedor SET estado = "renovada" WHERE id_proveedor = ' + element.id_proveedor);
                    }
                } else {
                    await db.query('INSERT INTO documentos_inscripcion SET ?', [element]);
                }
                  idinscripcion = element.id_inscripcion;
                  await db.query('UPDATE proveedor SET estado = "2" WHERE idproveedor = (SELECT idproveedor as id FROM inscripcion where idinscripcion = ' + idinscripcion + ')');
            }
        }
        // tslint:disable-next-line: max-line-length
        res.json({text: 'documentos_inscripcion guardado exitosamente'});
     }

   public delete (req: Request, res: Response) {
    res.json({text: 'eliminando usuario'});
}

public update (req: Request, res: Response) {
    res.json({text: 'actualizando usuario ' + req.params.id});
}
}

export const documentacionController = new DocumentacionController();
