import express from 'express'
import { AuthController } from '../controllers/authController';

const router = express.Router();

router.post('/signup', async (req, res) => {
    await AuthController.postSignup(req, res);
})

router.post('/login', async (req, res) => {
    await AuthController.postLogin(req, res);
})

router.post('/update-password', async (req, res) => {
    await AuthController.updatePassword(req, res);
})

router.post('/logout', async (req, res) => {
    await AuthController.logoutUser(req, res);
})

export const authRoutes = router