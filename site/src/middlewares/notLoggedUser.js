const notLoggedUser = (req,res,next) => {   //Valida que no exista un usuario logueado en la sesión
    if (req.session.userLogged == undefined) {
        next();
    } else {
        res.redirect(`/users/${req.session.userLogged.id}/profile`);
    }
};

module.exports = notLoggedUser;