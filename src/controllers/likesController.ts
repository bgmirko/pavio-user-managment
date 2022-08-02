import db from '../models';


export class LikesController {

    static async getAboutMePage(req, res) {
        if (req.session?.user?.id) {
            const user = await db.User.findOne({
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
        const userId = req.session?.user?.id;

        let performedLikes;
        // if user is logged in
        if (userId) {
            // find all his like actions
            performedLikes = await db.Like.findAll({
                where: {
                    likeFrom: userId
                },
                attributes: ['likeTo', 'isLiked'],
                raw: true
            })
        }

        const users = await db.User.findAll({
            // include: { model: db.Like, as: 'likeAction' },
            order: [['likes', "DESC"]]
        })

        const usersLikes = [];
        for (const user of users) {
            const userLiked = performedLikes?.find(performedLike => performedLike.likeTo == user.id)
            usersLikes.push({
                id: user.id,
                name: user.name,
                email: user.email,
                likes: user.likes,
                isUserLikedUser: userLiked ? userLiked.isLiked : false
            })
        }

        res.render('most-liked', {
            pageTitle: "Rankings",
            path: "/most-liked",
            users: usersLikes,
            loggedUserId: userId,
        })
    }

    static async likeUser(req, res) {
        const userId = req.session.user.id;
        await db.User.increment('likes', {
            by: 1,
            where: {
                id: req.params.id
            }
        })
        const [like, created] = await db.Like.findOrCreate({
            where: {
                likeFrom: userId,
                likeTo: req.params.id,
            },
            defaults: {
                likeFrom: userId,
                likeTo: req.params.id,
                isLiked: true
            }
        })
        if (!created) {
            like.isLiked = true;
            await like.save();
        }
        res.redirect('/')
    }

    static async unlikeUser(req, res) {
        const userId = req.session.user.id;
        await db.User.decrement('likes', {
            by: 1,
            where: {
                id: req.params.id
            }
        })
        const [like, created] = await db.Like.findOrCreate({
            where: {
                likeFrom: userId,
                likeTo: req.params.id,
            },
            defaults: {
                likeFrom: userId,
                likeTo: req.params.id,
                isLiked: false
            }
        })
        if (!created) {
            like.isLiked = false;
            await like.save();
        }
        res.redirect('/')
    }

    static async getUserDetails(req, res) {
        const user = await db.User.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        })
        console.log("user", user);
        res.render('user-details', {
            pageTitle: "User Details",
            path: "/user-details",
            user: user
        })
    }

}