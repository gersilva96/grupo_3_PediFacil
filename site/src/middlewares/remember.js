const db = require("../database/models");

const remember = async (req, res, next) => {    //Si hay una cookie vigente con información del usuario, guarda al usuario en la sesión
    if (req.cookies.userLogged != undefined && req.session.userLogged == undefined) {
        const user = await db.Users.findOne({
            where: {
                id: req.cookies.userLogged
            }
        });
        req.session.userLogged = user;
    }
    next();
};

module.exports = remember;