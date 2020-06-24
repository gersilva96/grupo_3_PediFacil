const usersControllers = require("../controllers/usersController");

const remember = (req,res,next) => {
    if (req.cookies.userLogged != undefined && req.session.userLogged == undefined) {
        req.session.userLogged = usersControllers.searchByEmail(req.cookies.userLogged);
    }
    next();
};

module.exports = remember;