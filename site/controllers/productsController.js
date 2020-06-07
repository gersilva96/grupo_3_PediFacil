const fs = require("fs");
const path = require("path");

//Funciones privadas
const productsFile = path.join(__dirname,"..","data","productsDataBase.json");
const readJSONFile = () => JSON.parse(fs.readFileSync(productsFile, "utf-8"));
const saveJSONFile = elem => fs.writeFileSync(productsFile, JSON.stringify(elem));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

const searchProduct = id => {
    let productos = readJSONFile();
    let productFound = null;
    productos.forEach(prod => {
        if (prod["id"] == id) {
            productFound = prod;
        }
    });
    return productFound; // si no lo encuentra devuelve null
};

//Funciones públicas
let productController = {
    //Muestra todos los productos
    root: (req,res) => {
        const products = readJSONFile();
        res.render("products", {products, formatPrice, toThousand});
    },

    //Muestra el detalle de un producto
    detail: (req,res) => {
        const product = searchProduct(req.params.id);
        res.render("productDetail", {product, formatPrice});
    },

    //Muestra el carrito
    cart: (req,res) => {
        res.render("productCart");
    },

    //Historial de compra
    orderHistory: (req,res) => {
        res.render("productOrderHistory");
    },

    //Detalle de historial de compra
    orderHistoryDetail: (req,res) => {
        res.render("productOrderHistoryDetail");
    },

    //Lista todos los productos
    list: (req,res) => {
        const products = readJSONFile();
        res.render("productList", {products});
    },

    //Formulario de carga de un producto
    create: (req,res) => {
        res.render("productAdd");
    },

    //Agrega un producto al JSON
    store: (req,res) => {
        res.send("Hola");
    },

    //Formulario de edición de un producto
    edit: (req,res) => {
        const product = searchProduct(req.params.id);
        res.render("productEdit", {product});
    },

    //Edita un producto del JSON
    update: (req,res) => {
        let products = readJSONFile();
        products.forEach(product => {
            if (product.id == req.params.id) {
                product.name = req.body.name;
                product.price = parseInt(req.body.price);
                product.discount = parseInt(req.body.discount);
                product.stock = parseInt(req.body.stock);
                product.description = req.body.description;
            }
        });
        saveJSONFile(products);
        res.redirect("/products");
    },

    //Elimina un producto del JSON
    delete: (req,res) => {
        const products = readJSONFile();
        const newProducts = products.filter(prod => prod.id != req.params.id);
        saveJSONFile(newProducts);
        res.redirect("/products");
    },
}

module.exports = productController;