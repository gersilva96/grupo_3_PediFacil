const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

let userController = {
    //Funciones
    usersFile: path.join(__dirname,"..","data","userDataBase.json"),   //Directorio del archivo de usuarios
    readJSONFile: () => JSON.parse(fs.readFileSync(userController.usersFile, "utf-8")),     //Leo el archivo userDataBase.json y lo parseo
    saveJSONFile: elem => fs.writeFileSync(userController.usersFile, JSON.stringify(elem)),     //Sobreescribo el archivo userDataBase.json
    searchByEmail: email => {       //Busco y retorno un usuario por su email
        let archivoJson = userController.readJSONFile();
        let userFound = null;
        archivoJson.forEach(elem => {
            if (elem["email"] == email) {
                userFound = elem;
            }
        });
        return userFound;
    },
    getNewId: () => {   //Obtengo el id que le corresponde al nuevo usuario
        const users = userController.readJSONFile();
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
        res.render("login");
    },
    processLogin: (req,res) => {
        const user = userController.searchByEmail(req.body.email);
        if (user != null && bcrypt.compareSync(req.body.password, user.password)) {
            res.send("Estás logueado!");
        } else {
            res.render("login");
        }
    },
    register: (req,res) => {
        res.render("register");
    },
    create: (req,res) => {
        if (req.body.password == req.body.password_repeat) {
            const newUser = {
                id: userController.getNewId(),
                business_name: req.body.business_name.trim(),
                email: req.body.email.trim(),
                first_name: req.body.first_name.trim(),
                last_name: req.body.last_name.trim(),
                password: bcrypt.hashSync(req.body.password,10),
                admin: false,
                image: req.file.filename
            };
            const users = userController.readJSONFile();
            users.push(newUser);
            userController.saveJSONFile(users);
            res.redirect("/user/login");
        } else {
            res.redirect("/user/register");
        }
    }
}

module.exports = userController;