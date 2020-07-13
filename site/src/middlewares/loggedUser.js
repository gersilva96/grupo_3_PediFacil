const loggedUser = (req, res, next) => {      //Valida que exista un usuario logueado en la sesión
    if (req.session.userLogged != undefined) {
        next();
    } else {
        res.redirect("/users/login");
    }
};

module.exports = loggedUser;