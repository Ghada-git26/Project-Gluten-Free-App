function requireAuth(req, res, next) {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/signin");
    }
}

function requireAdmin(req, res, next) {
    if (req.session.currentUser && res.locals.isAdmin) {
        next();
    } else {
        res.redirect("/signin");
    }
}

module.exports = {
    requireAuth: requireAuth,
    requireAdmin: requireAdmin
};