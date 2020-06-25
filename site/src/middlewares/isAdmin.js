const isAdmin = (req,res,next) => {     //Valida que el usuario logueado sea administrador
    if (req.session.userLogged.admin) {
        next();
    } else {
        res.render("error", {accessDenied: "Acceso denegado"});
    }
};

module.exports = isAdmin;