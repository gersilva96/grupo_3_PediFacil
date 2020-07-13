const isAdmin = (req, res, next) => {     //Valida que el usuario logueado sea administrador
    if (req.session.userLogged.role_id == 1) {
        next();
    } else {
        res.render("error", {accessDenied: "Esta sección es solo para administradores", user: req.session.userLogged});
    }
};

module.exports = isAdmin;