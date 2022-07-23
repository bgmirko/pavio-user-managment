import User from '../models/userModel';
import Session from '../models/sessionModel';
import bcrypt from 'bcryptjs';


export class LikesController {
    static async getMostLikedUsers(req, res, next) {
        res.render('most-liked', {
            pageTitle: "Users Ranking",
            path: "/most-liked"
        })
    }
}