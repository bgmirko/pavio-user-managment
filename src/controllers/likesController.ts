import db from '../models';
import { LikesService } from '../domain/likesService';


export class LikesController {

    static async getAboutMePage(req, res) {
        const userId = req.session?.user?.id;
        if (userId) {
            const user = await LikesService.getUserData(userId);
            res.json({
                code: 200,
                success: true,
                data: user,
                message: "User data fetch successfully"
            })
        } else {
            res.json({
                code: 400,
                success: false,
                message: "UserId missing"
            })
        }
    }
    static async getMostLikedUsers(req, res) {
        const userId = req.session?.user?.id;
        try {
            const usersLikes = await LikesService.getMostLikedUsers(userId);
            res.json({
                code: 100,
                success: true,
                data: usersLikes,
                message: "Most liked users fetch successfully",
            })
        } catch (error) {
            res.json({
                code: error?.code ?? 400,
                success: false,
                message: error.message,
            })
        }
    }

    static async likeUser(req, res) {
        const likeFromUserId = req.session.user.id;
        const likeToUserId = req.params.id;

        try {
            await LikesService.likeUser(likeFromUserId, likeToUserId)
            res.json({
                code: 100,
                success: true,
                message: "User liked successfully",
            })
        } catch (error) {
            res.json({
                code: error?.code ?? 400,
                success: false,
                message: error.message,
            })
        }
    }

    static async unlikeUser(req, res) {
        const unlikeFromUserId = req.session.user.id;
        const unlikeToUserId = req.params.id;
        try {
            await LikesService.unlikeUser(unlikeFromUserId, unlikeToUserId);
            res.json({
                code: 100,
                success: true,
                message: "User unliked successfully",
            })
        } catch (error) {
            res.json({
                code: error?.code ?? 400,
                success: false,
                message: error.message,
            })
        }
    }

    static async getUserDetails(req, res) {
        const user = await db.User.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        })
        if (user) {
            res.json({
                code: 100,
                success: true,
                data: user,
                message: "User fetch successfully",
            })
        } else {
            res.json({
                code: 400,
                success: false,
                message: "User not found",
            })
        }
    }

}