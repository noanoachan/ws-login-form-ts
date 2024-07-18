import express from 'express';
import { authLogin }  from '../controllers/authLoginController';

export const router = express.Router();

// POST: ログイン認証
router.post('/login', authLogin);
