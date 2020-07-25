const db = require("../database/models");

const selectAddress = async (req, res, next) => {
    const addresses = await db.Addresses.findAll({
        where: {
            user_id: req.session.userLogged.id
        }
    });
    if (addresses.length == 0) {
        res.redirect("/cart/add-address");
    } else {
        next();
    }
};

module.exports = selectAddress;