const fs = require("fs");
const path = require("path");
const glob = require("glob");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand((price*(1-(discount/100))).toFixed(2));

let productsController = {
    //Funciones
    productsFile: path.join(__dirname,"..","data","products.json"),     //Directorio del archivo productDataBase.json
    readJSONFile: () => JSON.parse(fs.readFileSync(productsController.productsFile, "utf-8")),   //Leo el archivo prducts.json y lo parseo
    saveJSONFile: elem => fs.writeFileSync(productsController.productsFile, JSON.stringify(elem)),   //Sobreescribo el archivo productDataBase.json
    searchProduct: id => {  //Busco y retorno un producto por su id
        let productos = productsController.readJSONFile();
        let productoEncontrado = null;
        productos.forEach(prod => {
            if (prod["id"] == id) {
                productoEncontrado = prod;
            }
        });
        return productoEncontrado; // si no lo encuentra devuelve null
    },
    getNewId: () => {   //Obtengo el id que le corresponde al nuevo producto
        const prods = productsController.readJSONFile();
        let lastId = 0;
        prods.forEach(producto => {
            if(producto.id > lastId) {
                lastId = producto.id;
            }
        });
        return lastId+=1;   //Retorna el id que le corresponde al nuevo producto
    },

    //Muestra los resultados de búsqueda
    search: (req,res) => {
        const products = productsController.readJSONFile();
        let results = [];
		products.forEach(product => {
			if(product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()) || product.description.toLowerCase().includes(req.query.keywords.toLowerCase().trim())){
				results.push(product);
			}
		});
		res.render("products/results", {results, toThousand, formatPrice, search: req.query.keywords});
    },

    //Muestra todos los productos
    root: (req,res) => {
        const products = productsController.readJSONFile();
        res.render("products/products", {products, formatPrice, toThousand});
    },

    //Muestra el detalle de un producto
    detail: (req,res) => {
        const product = productsController.searchProduct(req.params.id);
        res.render("products/productDetail", {product, formatPrice});
    },

    //Muestra el carrito
    cart: (req,res) => {
        res.render("products/productCart");
    },

    //Historial de compra
    orderHistory: (req,res) => {
        res.render("products/productOrderHistory");
    },

    //Detalle de historial de compra
    orderHistoryDetail: (req,res) => {
        res.render("products/productOrderHistoryDetail");
    },

    //Lista todos los productos
    list: (req,res) => {
        const products = productsController.readJSONFile();
        res.render("products/productList", {products});
    },

    //Formulario de carga de un producto
    create: (req,res) => {
        const newId = productsController.getNewId();
        res.render("products/productAdd", {newId});
    },

    //Agrega un producto al JSON
    store: (req,res) => {
        let products = productsController.readJSONFile();
        products.push({
            id: productsController.getNewId(),
            name: req.body.name.trim(),
            category: req.body.category.trim(),
            price: parseFloat(req.body.price),
            discount: parseInt(req.body.discount),
            stock: parseInt(req.body.stock),
            description: req.body.description.trim(),
            image: req.file.filename
        });
        productsController.saveJSONFile(products);
        res.redirect("/products");
    },

    //Formulario de edición de un producto
    edit: (req,res) => {
        const product = productsController.searchProduct(req.params.id);
        res.render("products/productEdit", {product});
    },

    //Edita un producto del JSON
    update: (req,res) => {
        let products = productsController.readJSONFile();
        products.forEach(product => {
            if (product.id == req.params.id) {
                product.name = req.body.name.trim();
                product.category = req.body.category.trim();
                product.price = parseFloat(req.body.price);
                product.discount = parseInt(req.body.discount);
                product.stock = parseInt(req.body.stock);
                product.description = req.body.description.trim();
            }
        });
        productsController.saveJSONFile(products);
        res.redirect("/products");
    },

    //Elimina un producto del JSON
    delete: (req,res) => {
        const products = productsController.readJSONFile();
        const newProducts = products.filter(prod => prod.id != req.params.id);
        productsController.saveJSONFile(newProducts);
        const imageFile = glob.sync(path.join(__dirname, "..", "..", "public", "images", "products", `img-prod${req.params.id}.{jpg,jpeg,png}`));
        imageFile.forEach(file => fs.unlinkSync(file));
        res.redirect("/products");
    }
}

module.exports = productsController;