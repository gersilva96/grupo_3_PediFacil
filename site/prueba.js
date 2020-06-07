const fs = require("fs");
const path = require("path");

const productsFile = path.join(__dirname,"data","productsDataBase.json");
const readJSONFile = () => JSON.parse(fs.readFileSync(productsFile, "utf-8"));
const saveJSONFile = elem => fs.writeFileSync(productsFile, JSON.stringify(elem));
let products = readJSONFile();
console.log(products);
let newProducts = products.filter(prod => prod.id != 1);
console.log(newProducts);
