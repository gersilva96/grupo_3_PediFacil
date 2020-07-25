const bcrypt = require("bcrypt");
const {check, validationResult, body} = require("express-validator");
const db = require("../database/models");

let usersController = {
    profile: async (req, res) => {         //GET - Muestra el perfil de un usuario - Debe haber un usuario logueado
        try {
            res.render("users/profile", {user: req.session.userLogged});
        } catch (error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    edit: async (req, res) => {             //GET - Muestra el formulario de edición de datos de un usuario - Debe haber un usuario logueado
        try {
            res.render("users/editProfile", {user: req.session.userLogged});
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    update: async (req, res) => {           //PUT - Actualiza la información de un usuario - Debe haber un usuario logueado
        try {
            let errors = validationResult(req);
            const userToEdit = await db.Users.findByPk(req.params.id);
            if (userToEdit.id != req.session.userLogged.id) {
                let newError = {
                    value: '',
                    msg: 'No podés editar los datos de otro usuario'
                };
                errors.errors.push(newError);
            }
            if (errors.isEmpty()) {
                if (typeof(req.file) === "undefined") {
                    await db.Users.update({
                        business_name: req.body.business_name,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name
                    }, {
                        where: {
                            id: req.session.userLogged.id
                        }
                    });
                    req.session.userLogged = await db.Users.findOne({
                        where: {
                            id: req.params.id
                        }
                    });
                    res.redirect("/users/profile");
                } else {
                    await db.Users.update({
                        business_name: req.body.business_name,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        image: req.file.filename
                    }, {
                        where: {
                            id: req.session.userLogged.id
                        }
                    });
                    req.session.userLogged = await db.Users.findOne({
                        where: {
                            id: req.params.id
                        }
                    });
                    res.redirect("/users/profile");
                }
            } else {
                res.render("users/editProfile", {errors: errors.errors, user: req.session.userLogged});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    login: async (req, res) => {           //GET - Muestra el formulario de Login - No debe haber un usuario logueado
        try {
            res.render("users/login", {user: req.session.userLogged});
        } catch (error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    processLogin: async (req, res) => {    //POST - Loguea a un usuario
        try {
            let errors = validationResult(req);
            const user = await db.Users.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (user == null) {
                let newError = {
                    value: '',
                    msg: 'No existe ningún usuario con el email ingresado',
                    param: 'email',
                    location: 'body'
                };
                errors.errors.push(newError);
            } else {
                const correctPassword = await bcrypt.compare(req.body.password, user.password);
                if (!correctPassword) {
                    let newError = {
                        value: '',
                        msg: 'La contraseña ingresada no es correcta',
                        param: '',
                        location: 'body'
                    };
                    errors.errors.push(newError);
                }
            }
            if (errors.isEmpty()) {
                req.session.userLogged = user;
                if (req.body.remember != undefined) {
                    res.cookie("userLogged", user.id, {maxAge: Date.now()});
                }
                res.redirect("/users/profile");
            } else {
                res.render("users/login", {errors: errors.errors, user: req.session.userLogged});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    logout: async (req, res) => {          //POST - Cierra la sesión del usuario logueado - Debe haber un usuario logueado
        try {
            req.session.userLogged = undefined;
            res.cookie("userLogged", undefined);
            res.redirect("/users/login");
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    register: async (req, res) => {        //GET - Muestra el formulario de Registro - No debe haber un usuario logueado
        try {
            res.render("users/register", {user: req.session.userLogged});
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    create: async (req, res) => {          //POST - Registra a un nuevo usuario
        try {
            let errors = validationResult(req);
            const userExisting = await db.Users.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (userExisting != null) {
                let newError = {
                    value: '',
                    msg: 'Ya existe un usuario con el email ingresado',
                    param: 'email',
                    location: 'body'
                };
                errors.errors.push(newError);
            }
            if (errors.isEmpty()) {
                await db.Users.create({
                    business_name: req.body.business_name,
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: await bcrypt.hash(req.body.password, 10),
                    image: "avatar-default.png",
                    role_id: parseInt(req.body.role)
                });
                const newUser = await db.Users.findOne({
                    where: {
                        email: req.body.email
                    }
                });
                req.session.userLogged = newUser;
                res.redirect("/users/profile");
            } else {
                res.render("users/register", {errors: errors.errors, user: req.session.userLogged});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    }
};

module.exports = usersController;