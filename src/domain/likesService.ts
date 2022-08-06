
import db from '../models';

export class LikesService {

    static async likeUser(likeFromUserId: number, likeToUserId: number) {
        await db.User.increment('likes', {
            by: 1,
            where: {
                id: likeToUserId
            }
        })
        const [like, created] = await db.Like.findOrCreate({
            where: {
                likeFrom: likeFromUserId,
                likeTo: likeToUserId,
            },
            defaults: {
                likeFrom: likeFromUserId,
                likeTo: likeToUserId,
                isLiked: true
            }
        })
        if (!created) {
            like.isLiked = true;
            await like.save();
        }
    }

    static async unlikeUser(unlikeFromUserId: number, unlikeToUserId: number) {
        await db.User.decrement('likes', {
            by: 1,
            where: {
                id: unlikeToUserId
            }
        })
        const [like, created] = await db.Like.findOrCreate({
            where: {
                likeFrom: unlikeFromUserId,
                likeTo: unlikeToUserId,
            },
            defaults: {
                likeFrom: unlikeFromUserId,
                likeTo: unlikeToUserId,
                isLiked: false
            }
        })
        // to unlike user, first user should be liked and like table row will exists
        if (!created) {
            like.isLiked = false;
            await like.save();
        }
    }

    static async getMostLikedUsers(userId?: number): Promise<any> {
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

        return usersLikes;
    }

    static async getUserData(userId: number): Promise<typeof db.User> {
        return db.User.findOne({
            where: {
                id: userId
            },
            raw: true
        })
    }
}