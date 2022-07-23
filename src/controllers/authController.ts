import User from '../models/userModel';


export class AuthController {
    static async getLogin(req, res, next) {
        // return User.findOne({
        //     where: id
        // });
        res.render('login', {
            pageTitle: 'Login',
            path: '/login'
        })
    }

}