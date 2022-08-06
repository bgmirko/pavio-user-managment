import { LikesService } from '../domain/likesService';
import db from "../models"

describe("Likes Management", () => {

    beforeEach(async () => {
        await db.sequelize.sync({ force: true });
        await db.User.create({
            id: 1,
            name: "User 1",
            email: "user1@gmail.com",
            password: "testpassword",
            address: "Street 1",
            likes: 5,
        })
        await db.User.create({
            id: 2,
            name: "User 2",
            email: "user2@gmail.com",
            password: "testpassword",
            address: "Street 2",
            likes: 3,
        })
    })

    it("Get most liked users", async () => {
        const users = await LikesService.getMostLikedUsers();
        expect(users.length).toBe(2);
    })

    it("Get user list, first user should with most likes", async () => {
        const users = await LikesService.getMostLikedUsers();
        expect(users[0].likes).toBe(5);
    })

    it("Like user should increment number of user likes", async () => {
        await LikesService.likeUser(1, 2);
        const likedUser = await db.User.findOne({
            where: {
                id: 2,
            }
        })
        expect(likedUser.likes).toBe(4);
    })

    it("When user 1 like then unlike user 2, user 2 should have start amount of likes", async () => {
        // that user would be unliked first should be liked
        await LikesService.likeUser(1, 2);

        await LikesService.unlikeUser(1, 2);
        const likedUser = await db.User.findOne({
            where: {
                id: 2,
            }
        })
        expect(likedUser.likes).toBe(3);
    })

    it("Get user 1 data should return data ", async () => {
        const user = await LikesService.getUserData(1);
        expect(user.name === "User 1").toBeTruthy();
    })
}) 