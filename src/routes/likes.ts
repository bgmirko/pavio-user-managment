import express from 'express';
import { LikesController } from 'controllers/likesController';

const router = express.Router();


router.get('/me', async (req, res) => {
    await LikesController.getAboutMePage(req, res);
})

router.get('/user/:id/like', async (req, res) => {
    await LikesController.likeUser(req, res);
})

router.post('/user/:id/', (req, res) => {
    res.send('<h1>Like user</h1>');
})

router.get('/user/:id/unlike', async (req, res) => {
    console.log("---- prolaz 1")
    await LikesController.unlikeUser(req, res);
})

router.get('/most-liked', async (req, res, next) => {
    await LikesController.getMostLikedUsers(req, res, next);
})

export const likesRoutes = router;