import mysql, { PoolConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host                : process.env.DB_HOST,
  user                : process.env.DB_USER,
  password            : process.env.DB_PASSWORD,
  database            : process.env.DB_NAME,
  waitForConnections  : true,
  connectionLimit     : 10,
  queueLimit          : 0
});

pool.getConnection()
  .then((connection: PoolConnection) => 
  {
    console.log('データベースに接続に成功しました');
    connection.release();
  })
  .catch((err: string) => 
  {
    console.error(`データベースへの接続中にエラーが発生しました: ${err}`);
  });