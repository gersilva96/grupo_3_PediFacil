const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const {check, validationResult, body} = require("express-validator");
const { use } = require("../routes/users");

let usersController = {
    //Funciones
    usersFile: path.join(__dirname,"..","data","users.json"),   //Directorio del archivo de usuarios
    readJSONFile: () => JSON.parse(fs.readFileSync(usersController.usersFile, "utf-8")),     //Leo el archivo userDataBase.json y lo parseo
    saveJSONFile: elem => fs.writeFileSync(usersController.usersFile, JSON.stringify(elem)),     //Sobreescribo el archivo userDataBase.json
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
        return lastId+=1;   //Retorna el id que le corresponde al nuevo usuario
    },

    //Métodos
    profile: (req,res) => {
        const user = usersController.searchById(req.params.id);
        res.render("users/profile", {user});
    },
    login: (req,res) => {
        res.render("users/login");
    },
    processLogin: (req,res) => {
        let errors = validationResult(req);
        const user = usersController.searchByEmail(req.body.email);
        if (errors.isEmpty()) {
            res.redirect(`/users/${user.id}/profile`);
        } else {
            res.render("users/login", {errors: errors.errors});
        }
    },
    register: (req,res) => {
        res.render("users/register");
    },
    create: (req,res) => {
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
            res.redirect(`/users/${newUser.id}/profile`);
        } else {
            res.render("users/register", {errors: errors.errors})
        }
    }
}

module.exports = usersController;