const usersControllers = require("../controllers/usersController");

const remember = (req,res,next) => {    //Si hay una cookie vigente con información del usuario, guarda al usuario en la sesión
    if (req.cookies.userLogged != undefined && req.session.userLogged == undefined) {
        req.session.userLogged = usersControllers.searchByEmail(req.cookies.userLogged);
    }
    next();
};

module.exports = remember;