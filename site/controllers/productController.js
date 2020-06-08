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
    let productoEncontrado = null;
    productos.forEach(prod => {
        if (prod["id"] == id) {
            productoEncontrado = prod;
        }
    });
    return productoEncontrado; // si no lo encuentra devuelve null
};

//Funciones públicas
let productController = {
    //Funciones
    getNewId: () => {
        const prods = readJSONFile();
        let lastId = 0;
        prods.forEach(producto => {
            if(producto.id > lastId) {
                lastId = producto.id;
            }
        });
        return lastId+=1;   //Retorna el id que le corresponde al nuevo producto
    },

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
        const newId = productController.getNewId();
        res.render("productAdd", {newId});
    },

    //Agrega un producto al JSON
    store: (req,res) => {
        let products = readJSONFile();
        products.push({
            id: productController.getNewId(),
            name: req.body.name,
            category: req.body.category,
            price: parseInt(req.body.price),
            discount: parseInt(req.body.discount),
            stock: parseInt(req.body.stock),
            description: req.body.description,
            image: req.file.filename
        });
        saveJSONFile(products);
        res.redirect("/products");
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
    }
}

module.exports = productController;