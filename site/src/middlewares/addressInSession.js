const addressInSession = (req, res, next) => {
    if (req.session.selectedAddressId == undefined) {
        res.render("error", {message: "No podés ingresar porque aún no has elegido una dirección", user: req.session.userLogged});
    } else {
        next();
    }
};

module.exports = addressInSession;