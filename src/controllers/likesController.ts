import Session from '../models/sessionModel';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import Likes from '../models/likeModel';


export class LikesController {

    static async getAboutMePage(req, res) {
        if (req.session?.user?.id) {
            const user = await User.findOne({
                where: {
                    id: req.session?.user?.id
                },
                raw: true
            })
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
    static async getMostLikedUsers(req, res, next) {
        const users = await User.findAll({
            order: [['likes', "DESC"]],
            raw: true
        })
        res.render('most-liked', {
            pageTitle: "Rankings",
            path: "/most-liked",
            users: users
        })
    }

    static async likeUser(req, res) {
        console.log("param", req.params.id);
        const like = await Likes.upsert({
            likeFrom: req.session.user.id,
            likeTo: req.params.id,
            isLiked: true
        })
        console.log("likes", like);
        const users = await User.findAll({
            // include: Likes,
            order: [['likes', "DESC"]]
        })
        console.log(users);
        res.render('most-liked', {
            pageTitle: "Rankings",
            path: "/most-liked",
            users: users
        })
    }
}