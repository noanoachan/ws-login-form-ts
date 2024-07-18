import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import CryptoJS from 'crypto-js';
import { getUserInfo } from '../models/authLoginModel'


/**
 * @brief     ログイン認証
 * @param req   リクエスト
 * @param res   レスポンス
 * @returns   ログイン認証結果
 */
export async function authLogin (req: Request, res: Response)
{
  let userInfo: 
  {
    username: string,
    password: string
  };
  userInfo = {...req.body};

  /**
   * ------------------------------------------------------------------------------------------------------------------------
   * Decryption of user information
   */
  const bytesUser: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(userInfo.username, (process.env.ENCRYPTION_USER as string));
  const bytesPass: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(userInfo.password, (process.env.ENCRYPTION_PASS as string));
  
  const decryptedUser: string = bytesUser.toString(CryptoJS.enc.Utf8);
  const decryptedPass: string = bytesPass.toString(CryptoJS.enc.Utf8);
  /**
   * ------------------------------------------------------------------------------------------------------------------------
   */

  try 
  {
    const [results, fields] = await getUserInfo(decryptedUser, decryptedPass);
    let rows: RowDataPacket[] = (results as RowDataPacket[]);
    
    if (rows.length === 0) 
    {
      res.status(401).json('ユーザー認証に失敗しました。');
      return;
    }
    
    res.status(200).json('ユーザー認証が成功しました。');
    rows.forEach(result => {
      console.log(`ユーザーID: ${result.id}, ユーザー名: ${result.username}, パスワード: ${result.password}`);
    });
  } 
  catch (err) 
  {
    res.status(500).json(`データベースからユーザー情報の取得に失敗しました。(${err})`);
  }

  return res;
};