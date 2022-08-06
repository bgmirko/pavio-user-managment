import { LikesService } from '../domain/likesService';
import db from "../models"

describe("Likes Management", () => {

    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        await db.User.create({
            name: "User 1",
            email: "user1@gmail.com",
            password: "testpassword",
            address: "Street 1",
            likes: 5,
        })
        await db.User.create({
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


}) 