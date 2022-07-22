import express from 'express';
// @ts-ignore
import User from '../models/userModel';
// @ts-ignore
import Like from '../models/likeModel';

const router = express.Router();

router.post('/user/:id/like', (req, res) => {
    res.send('<h1>Like user</h1>');
})

router.post('/user/:id/unlike', (req, res) => {
    res.send('<h1>User unlike</h1>');
})

router.get('/most-liked', (req, res) => {
    res.send('<h1>Most Liked user</h1>');
})

export const loginRoutes = router;