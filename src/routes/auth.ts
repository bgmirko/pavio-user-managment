import express from 'express'
import path from 'path';
// @ts-ignore
import User from '../models/userModel';
// @ts-ignore
import Like from '../models/likeModel';
import { Model } from 'sequelize/types';
import { AuthController } from '../controllers/authController'

const router = express.Router();

// TODO see in this file where do we need async

router.get('/signup', async (req, res, next) => {
    const result = await AuthController.getSignup(req, res, next);
})

router.get('/login-page', (req, res) => {
    res.render('login-page');
})

router.get('/login', async (req, res, next) => {
    const result = await AuthController.getLogin(req, res, next);
})

router.post('/update-password', (req, res) => {
    res.send('<h1>Update password</h1>')
})

export const authRoutes = router