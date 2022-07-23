import User from '../models/userModel';


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

}