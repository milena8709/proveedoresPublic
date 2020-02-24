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
        console.log('consultar documentos' + id);
        const clasificiones =  await db.query('SELECT * FROM prosegma.clasificacion where idInscripcion  = ?', [id]);
        if (clasificiones.length > 0) {
           let documentos: any = [];
           console.log('tamdocumento' + documentos.length);
            for (const clasificacion of clasificiones) {
                // if (clasificacion.codigoSegmento !== '') {
                    // tslint:disable-next-line: prefer-const
                    // tslint:disable-next-line: max-line-length
                    let sql = 'SELECT * FROM prosegma.solicitud_documentos where ';
                    if (clasificacion.codigoSegmento !== '') {
                        sql = sql + ' codigoSegmento = ' + clasificacion.codigoSegmento;
                    }
                    if (clasificacion.codigoFamilia !== '') {
                        sql = sql + ' OR codigoFamilia = ' + clasificacion.codigoFamilia;
                    }
                    if (clasificacion.codigoClase !== '') {
                        sql = sql + ' OR codigoClase = ' + clasificacion.codigoClase;
                    }
                    if (clasificacion.codigoProducto !== '') {
                        sql = sql + ' OR codigoProducto = ' + clasificacion.codigoProducto;
                    }
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
        console.log('documentos', req.body[0]);
        const file = req.body;
        let idinscripcion;
        for (let index = 0; index < req.body.length; index++) {
            const element = req.body[index];
            if (element !== undefined) {
                await db.query('INSERT INTO documentos_inscripcion SET ?', [element]);
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
