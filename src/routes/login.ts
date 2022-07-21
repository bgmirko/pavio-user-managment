import express from 'express'
import path from 'path';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('<h1>Sign up</h1>')
})

router.get('/login-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'login-page.html'));
})

router.post('/login', (req, res) => {
    console.log(req.body);
    res.send('<h1>Login user</h1>')
})

router.get('/update-password', (req, res) => {
    res.send('<h1>Update password</h1>')
})

export const loginRoutes = router