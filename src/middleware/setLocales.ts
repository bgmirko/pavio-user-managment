export const setLocales = (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
}