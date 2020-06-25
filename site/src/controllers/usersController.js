const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const {check, validationResult, body} = require("express-validator");
const { render } = require("ejs");

let usersController = {
    //Funciones
    usersFile: path.join(__dirname,"..","data","users.json"),   //Directorio del JSON de usuarios

    readJSONFile: () => JSON.parse(fs.readFileSync(usersController.usersFile, "utf-8")),     //Leo el JSON y lo parseo

    saveJSONFile: elem => fs.writeFileSync(usersController.usersFile, JSON.stringify(elem)),     //Sobreescribo el JSON

    searchByEmail: email => {       //Busco y retorno un usuario por su email
        let archivoJson = usersController.readJSONFile();
        let userFound = null;
        archivoJson.forEach(elem => {
            if (elem["email"] == email) {
                userFound = elem;
            }
        });
        return userFound;
    },

    searchById: id => {       //Busco y retorno un usuario por su id
        let archivoJson = usersController.readJSONFile();
        let userFound = null;
        archivoJson.forEach(user => {
            if (user["id"] == id) {
                userFound = user;
            }
        });
        return userFound;
    },

    getNewId: () => {   //Obtengo el id que le corresponde al nuevo usuario
        const users = usersController.readJSONFile();
        let lastId = 0;
        users.forEach(user => {
            if(user.id > lastId) {
                lastId = user.id;
            }
        });
        return lastId+=1;   //Retorno el id que le corresponde al nuevo usuario
    },

    //Métodos para el router
    profile: (req,res) => {         //Muestra el perfil de un usuario
        const user = req.session.userLogged;
        res.render("users/profile", {user});
    },

    login: (req,res) => {           //Muestra el formulario de Login
        res.render("users/login");
    },

    processLogin: (req,res) => {    //Loguea a un usuario
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = usersController.searchByEmail(req.body.email);
            req.session.userLogged = user;
            if (req.body.remember != undefined) {
                res.cookie("userLogged", user.id, {maxAge: Date.now()});
            }
            res.redirect("/users/profile");
        } else {
            res.render("users/login", {errors: errors.errors});
        }
    },

    logout: (req,res) => {          //Cierra la sesión del usuario logueado
        req.session.userLogged = undefined;
        res.cookie("userLogged", undefined);
        res.redirect("/users/login");
    },

    register: (req,res) => {        //Muestra el formulario de Registro
        res.render("users/register");
    },

    create: (req,res) => {          //Registra a un nuevo usuario
        let errors = validationResult(req);
        if (typeof req.file === "undefined") {
            let newError = {
               value: '',
               msg: 'Debe cargar una imagen de avatar',
               param: 'avatar',
               location: 'files'
            }
            errors.errors.push(newError);
        };
        if (errors.isEmpty()) {
            const newUser = {
                id: usersController.getNewId(),
                business_name: req.body.business_name.trim(),
                email: req.body.email.trim(),
                first_name: req.body.first_name.trim(),
                last_name: req.body.last_name.trim(),
                password: bcrypt.hashSync(req.body.password,10),
                admin: false,
                image: req.file.filename
            };
            const users = usersController.readJSONFile();
            users.push(newUser);
            usersController.saveJSONFile(users);
            req.session.userLogged = newUser;
            res.redirect("/users/profile");
        } else {
            res.render("users/register", {errors: errors.errors})
        }
    }
}

module.exports = usersController;