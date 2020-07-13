const isSeller = (req, res, next) => {
    if (req.session.userLogged.role_id <= 2) {
        next();
    } else {
        res.render("error", {accessDenied: "Esta sección es solo para vendedores", user: req.session.userLogged});
    }
};

module.exports = isSeller;