const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

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
    login: (req,res) => {
        res.render("users/login");
    },
    processLogin: (req,res) => {
        const user = usersController.searchByEmail(req.body.email);
        if (user != null && bcrypt.compareSync(req.body.password, user.password)) {
            res.send("Estás logueado!");
        } else {
            res.render("users/login");
        }
    },
    register: (req,res) => {
        res.render("users/register");
    },
    create: (req,res) => {
        if (req.body.password == req.body.password_repeat) {
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
            res.redirect("/user/login");
        } else {
            res.redirect("/user/register");
        }
    }
}

module.exports = usersController;