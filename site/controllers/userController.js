const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

//Funciones privadas
const usersFile = path.join(__dirname,"..","data","users.json");
const readJSONFile = () => JSON.parse(fs.readFileSync(usersFile, "utf-8"));
const searchByEmail = email => {
    let archivoJson = readJSONFile();
    let userFound = null;
    archivoJson.forEach(elem => {
        if (elem["email"] == email) {
            userFound = elem;
        }
    });
    return userFound;
};

//Funciones públicas
let userController = {
    login: (req,res) => {
        res.render("login");
    },
    processLogin: (req,res) => {
        const user = searchByEmail(req.body.email);
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
                business_name: req.body.business_name,
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: bcrypt.hashSync(req.body.password,10),
                admin: false
            };
            const users = readJSONFile();
            users.push(newUser);
            fs.writeFileSync(usersFile,JSON.stringify(users));
            res.send("Registrado!");
        } else {
            res.redirect("/user/register");
        }
    }
}

module.exports = userController;