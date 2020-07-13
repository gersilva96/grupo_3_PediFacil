const getUser = (req, res, next) => {
    if (req.session.userLogged == undefined) {
        req.session.userLogged = undefined;
        next();
    } else {
        next();
    }
};

module.exports = getUser;