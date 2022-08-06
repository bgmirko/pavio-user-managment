import { UserService } from '../domain/userService';
import db from "../models";
import bcrypt from 'bcryptjs';

describe("User Management", () => {

    beforeEach(async () => {
        await db.sequelize.sync({ force: true });
        await db.User.create({
            id: 1,
            name: "User 1",
            email: "user1@gmail.com",
            password: await bcrypt.hash("testpassword", 12),
            address: "Street 1",
            likes: 5,
        })
    })

    it("Find user 1 by his email should return user 1", async () => {
        const user = await UserService.findUserByEmail("user1@gmail.com");
        expect(user.name === "User 1").toBeTruthy();
    })

    it("Log user 1 by his password should login user", async () => {
        const user = await UserService.findUserByEmail("user1@gmail.com");
        const response = await UserService.loginUser("testpassword", user, 300);
        expect(response.success).toBeTruthy();
    })

    it("Log user 1 by wrong password shouldn't log user", async () => {
        const user = await UserService.findUserByEmail("user1@gmail.com");
        const response = await UserService.loginUser("wrongpassword", user, 300);
        expect(response.success).toBeFalsy();
    })

    it("Update new password, with entering correct old password should return true ", async () => {
        const user = await UserService.findUserByEmail("user1@gmail.com");
        const response = await UserService.updatePassword(user.id, user.email, "testpassword", user.password, "newpassword");
        expect(response).toBeTruthy();
    })

    it("Update new password, with entering wrong old password should return false", async () => {
        const user = await UserService.findUserByEmail("user1@gmail.com");
        const response = await UserService.updatePassword(user.id, user.email, "wrongpassword", user.password, "newpassword");
        expect(response).toBeFalsy();
    })
}) 