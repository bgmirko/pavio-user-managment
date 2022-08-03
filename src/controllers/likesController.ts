import db from '../models';
import { LikesService } from '../domain/likesService';


export class LikesController {

    static async getAboutMePage(req, res) {
        const userId = req.session?.user?.id;
        if (userId) {
            const user = await LikesService.getUserData(userId);
            res.render('me', {
                pageTitle: "About Me",
                path: "/me",
                user: user
            })
        } else {
            res.render('me', {
                pageTitle: "About Me",
                path: "/me",
            })
        }
    }
    static async getMostLikedUsers(req, res) {
        const userId = req.session?.user?.id;

        const usersLikes = await LikesService.getMostLikedUsers(userId);

        res.render('most-liked', {
            pageTitle: "Rankings",
            path: "/most-liked",
            users: usersLikes,
            loggedUserId: userId,
        })
    }

    static async likeUser(req, res) {
        const likeFromUserId = req.session.user.id;
        const likeToUserId = req.params.id;
        await LikesService.likeUser(likeFromUserId, likeToUserId)
        res.redirect('/')
    }

    static async unlikeUser(req, res) {
        const unlikeFromUserId = req.session.user.id;
        const unlikeToUserId = req.params.id;
        await LikesService.unlikeUser(unlikeFromUserId, unlikeToUserId);
        res.redirect('/')
    }

    static async getUserDetails(req, res) {
        const user = await db.User.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        })
        res.render('user-details', {
            pageTitle: "User Details",
            path: "/user-details",
            user: user
        })
    }

}