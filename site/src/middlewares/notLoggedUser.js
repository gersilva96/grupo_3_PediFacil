const notLoggedUser = (req,res,next) => {
    if (req.session.userLogged == undefined) {
        next();
    } else {
        res.redirect(`/users/${req.session.userLogged.id}/profile`);
    }
};

module.exports = notLoggedUser;