const isAdmin = (req,res,next) => {
    if (req.session.userLogged.admin) {
        next();
    } else {
        res.render("error", {accessDenied: "Acceso denegado"});
    }
};

module.exports = isAdmin;