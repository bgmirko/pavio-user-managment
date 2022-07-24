import express from 'express';
import { LikesController } from 'controllers/likesController';

const router = express.Router();


router.get('/me', async (req, res) => {
    await LikesController.getAboutMePage(req, res);
})

router.get('/user/:id/like', (req, res) => {
    res.send('<h1>Like user</h1>');
})

router.post('/user/:id/like', (req, res) => {
    res.send('<h1>Like user</h1>');
})

router.post('/user/:id/unlike', (req, res) => {
    res.send('<h1>User unlike</h1>');
})

router.get('/most-liked', async (req, res, next) => {
    await LikesController.getMostLikedUsers(req, res, next);
})

export const likesRoutes = router;