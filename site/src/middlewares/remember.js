const db = require("../database/models");
const bcrypt = require("bcrypt");

const remember = async (req, res, next) => {    //Si hay una cookie vigente con información del usuario, guarda al usuario en la sesión
    try {
        if (req.cookies.access_token != undefined && req.session.userLogged == undefined) {
            const lastUser = await db.Users.findOne({
                order: [["id", "DESC"]],
                attributes: ["id"]
            });
            const lastId = lastUser.id;
            let correctId;
            for (let i = 1; i <= lastId; i++) {
                let id = await bcrypt.compare(i.toString(), req.cookies.access_token);
                if (id) {
                    correctId = i;
                    break;
                }
            }
            const user = await db.Users.findOne({
                where: {
                    id: correctId
                }
            });
            req.session.userLogged = user;
        }
        next();
    } catch (error) {
        res.render("error", {message: error, user: req.session.userLogged});
    }
};

module.exports = remember;