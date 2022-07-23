import User from '../models/userModel';
import bcrypt from 'bcryptjs';


export class AuthController {
    static async getLogin(req, res, next) {
        console.log("get login", req.session.isLoggedIn);
        console.log("session", req.session)
        req.session.isLoggedIn = true;
        // console.log(req.get('Cookie').split(';')[1].trim().split('=')[1]);
        // return User.findOne({
        //     where: id
        // });
        res.render('login', {
            pageTitle: 'Login',
            path: '/login',
            isAuthenticated: false
        })
    }

    static async getSignup(req, res, next) {
        res.render('signup', {
            path: '/signup',
            pageTitle: 'Signup',
            isAuthenticated: false
        })
    }

    static async postLogin(req, res, next) {
        res.session.isLoggedIn = true;
        res.redirect("/");
        // res.render('/', {
        //     pageTitle: 'User Like Ranking',
        //     path: '/login'
        // })
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