import { pool } from '../config/db';
import { QueryResult, FieldPacket } from 'mysql2';


/**
 * @brief     ユーザー情報取得
 * @param username    ユーザー名
 * @param password    パスワード
 * @returns   クエリ実行結果
 */
export async function getUserInfo (username: string, password: string,): Promise<[QueryResult, FieldPacket[]]> 
{
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  return pool.query(query, [username, password]);
};