import express from 'express'
import { AuthController } from '../controllers/authController';

const router = express.Router();

router.get('/signup', async (req, res, next) => {
    await AuthController.getSignup(req, res, next);
})

router.post('/signup', async (req, res, next) => {
    await AuthController.postSignup(req, res, next);
})

router.post('/login', async (req, res, next) => {
    await AuthController.postLogin(req, res, next);
})

router.get('/login', async (req, res, next) => {
    await AuthController.getLogin(req, res, next);
})

router.get('/update-password', async (req, res, next) => {
    await AuthController.getUpdatePassword(req, res, next);
})

router.post('/update-password', async (req, res, next) => {
    await AuthController.updatePassword(req, res, next);
})

router.post('/logout', async (req, res, next) => {
    await AuthController.logoutUser(req, res, next);
})

export const authRoutes = router