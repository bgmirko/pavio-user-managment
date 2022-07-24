import Session from '../models/sessionModel';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';


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
        res.render('most-liked', {
            pageTitle: "Users Ranking",
            path: "/most-liked"
        })
    }
}