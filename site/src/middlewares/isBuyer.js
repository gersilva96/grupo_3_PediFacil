const isBuyer = (req, res, next) => {
    if (req.session.userLogged.role_id == 3 || req.session.userLogged.role_id == 1) {
        next();
    } else {
        res.render("error", {accessDenied: "Esta sección es solo para compradores", user: req.session.userLogged});
    }
};

module.exports = isBuyer;