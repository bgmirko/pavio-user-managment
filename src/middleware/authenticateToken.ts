import jwt from 'jsonwebtoken';
import Session from 'models/sessionModel';
export const authenticateToken = async (req, res, next) => {
    const token = req.cookies?.token
    const user = req.session.user;

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } else {
        if (user) {
            const userSession = await Session.findOne({
                userId: user.id,
            })
            if (userSession && userSession.isLoggedIn) {
                userSession.isLoggedIn = false;
                await userSession.save();
                res.locals.isAuthenticated = false;
            }
        }
    }
    next();
}