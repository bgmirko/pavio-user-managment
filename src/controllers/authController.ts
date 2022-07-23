import User from '../models/userModel';
import Session from '../models/sessionModel';
import bcrypt from 'bcryptjs';


export class AuthController {
    static async getLogin(req, res, next) {
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

    static async getSignup(req, res, next) {
        if (req.session.isLoggedIn) {
            return res.redirect("/");
        }
        res.render('signup', {
            path: '/signup',
            pageTitle: 'Signup'
        })
    }

    static async postLogin(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            return res.redirect("/login");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            await Session.create({
                userId: user.id,
                idLoggedIn: true,
            })
            return res.redirect('/')
        } else {
            req.flash('error', 'Invalid email or password.')
            return res.redirect("/login");
        }
    }

    static async postSignup(req, res, next) {
        const email = req.body.email;
        // TODO implement validation
        const password = req.body.password;
        console.log("password", password);
        const confirmPassword = req.body.confirmPassword;
        const user = await User.findOne({
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
        await User.create({
            name,
            email,
            password: hashPassword,
            address,
        })
        res.redirect("/login");
    }

}