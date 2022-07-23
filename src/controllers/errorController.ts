import User from '../models/userModel';

export class ErrorController {
    static get404 = (req, res, next) => {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            path: '/404',
            isAuthenticated: req.isLoggedIn
        });
    }
}