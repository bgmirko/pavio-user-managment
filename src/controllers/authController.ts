import db from '../models';
import bcrypt from 'bcryptjs';
import { UserService } from "../domain/userService";


export class AuthController {
    static async postLogin(req, res) {
        const email = req.body.email;
        const enteredPassword = req.body.password;
        const jwtExpirySeconds = 300;
        const user = await UserService.findUserByEmail(email);
        if (!user) {
            return res.redirect("/login");
        }
        const { success, token } = await UserService.loginUser(enteredPassword, user, jwtExpirySeconds)
        if (success) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
            res.json({
                code: 200,
                success: true,
                data: {
                    token
                },
                message: "User login successfully"
            })
        } else {
            res.json({
                code: 401,
                success: false,
                message: "Invalid email or password"
            })
        }
    }

    static async postSignup(req, res) {
        const email = req.body.email;
        // TODO implement validation
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const user = await UserService.findUserByEmail(email);
        if (user) {
            res.json({
                code: 406,
                success: false,
                message: "User already exists"
            })
        }
        const name = req.body.name;
        const address = req.body.address;
        const hashPassword = await bcrypt.hash(password, 12);
        await db.User.create({
            name,
            email,
            password: hashPassword,
            address,
        })
        res.json({
            code: 200,
            success: true,
            message: "User created successfully"
        })
    }

    static async logoutUser(req, res) {
        const userId = req.session?.user?.id;
        if (!userId) {
            res.json({
                code: 404,
                success: false,
                message: "User not found"
            })
        };
        try {
            await db.Session.destroy({
                where: {
                    userId,
                }
            })
            req.session.destroy();
            res.locals.isAuthenticated = false;
            res.json({
                code: 200,
                success: true,
                message: "User logout successfully"
            })
        } catch (e) {
            res.json({
                code: 500,
                success: false,
                message: "Server internal error"
            })
        }
    }

    static async updatePassword(req, res) {
        const userId = req.session?.user?.id;
        if (!req.session.isLoggedIn || !userId || !req.session?.user) {
            return res.json({
                code: 400,
                success: false,
                message: "User not found"
            })
        }
        const updatePasswordSuccess = await UserService.updatePassword(userId, req.session?.user?.email, req.body.currentPassword, req.session?.user?.password, req.body.newPassword);
        if (updatePasswordSuccess) {
            req.session.destroy();
            res.locals.isAuthenticated = false;
        }
        return res.json({
            code: 200,
            success: true,
            message: "Password updated successfully"
        })
    }

}