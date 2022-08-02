import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export class AuthController {
    static async getLogin(req, res) {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0]
        } else {
            message = null;
        }
        if (req.session.isLoggedIn) {
            return res.redirect("/");
        }
        res.render('login', {
            pageTitle: 'Login',
            path: '/login',
            errorMessage: message
        })
    }

    static async getSignup(req, res) {
        if (req.session.isLoggedIn) {
            return res.redirect("/");
        }
        res.render('signup', {
            path: '/signup',
            pageTitle: 'Signup'
        })
    }

    static async postLogin(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const user = await db.User.findOne({
            where: {
                email
            },
            raw: true
        })
        if (!user) {
            return res.redirect("/login");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            const jwtExpirySeconds = 300;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 })
            await db.Session.create({
                userId: user.id,
                isLoggedIn: true,
            })
            res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
            return res.redirect('/')
        } else {
            req.flash('error', 'Invalid email or password.')
            return res.redirect("/login");
        }
    }

    static async postSignup(req, res) {
        const email = req.body.email;
        // TODO implement validation
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const user = await db.User.findOne({
            where: {
                email
            }
        })
        if (user) {
            return res.redirect('/signup');
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
        res.redirect("/login");
    }

    static async logoutUser(req, res) {
        const userId = req.session?.user?.id;
        if (!userId) return;
        await db.Session.destroy({
            where: {
                userId,
            }
        })
        req.session.destroy();
        res.locals.isAuthenticated = false;
        res.redirect("/");
    }

    static async getUpdatePassword(req, res) {
        if (!req.session.isLoggedIn) {
            return res.redirect("/");
        }
        res.render('update-password', {
            path: '/update-password',
            pageTitle: 'Update Password'
        })
    }

    static async updatePassword(req, res) {
        const userId = req.session?.user?.id;
        if (!req.session.isLoggedIn || !userId) {
            return res.redirect("/");
        }
        const user = await db.User.findOne({
            where: {
                id: userId,
            }
        })
        const isPasswordCorrect = await bcrypt.compare(req.body.currentPassword, user.password);
        if (isPasswordCorrect && req.body.newPassword) {
            const hashPassword = await bcrypt.hash(req.body.newPassword, 12);
            user.password = hashPassword
            await user.save();
            await db.Session.destroy({
                where: {
                    userId,
                }
            })
            req.session.destroy();
            res.locals.isAuthenticated = false;
        }
        res.redirect('/login')
    }

}