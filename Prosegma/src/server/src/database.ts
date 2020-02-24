import * as mysql from 'promise-mysql';
import keys from './keys';
import * as express from 'express';

const pool =  mysql.createPool(keys.database);

pool.getConnection()
    .then((connection: any) => {
      pool.releaseConnection(connection);
        console.log('Se establecio la conexión a la BD' + keys.database.host);

    });

export default pool;

