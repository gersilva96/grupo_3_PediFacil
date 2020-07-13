const db = require("../database/models");
const { validationResult } = require("express-validator");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => {
    let priceDot;
    if (discount == undefined) {
        priceDot = toThousand(price.toFixed(2));
    } else {
        priceDot = toThousand((price*(1-(discount/100))).toFixed(2));
    }
    let first = priceDot.slice(0,-3);
    let last = priceDot.slice(-3);
    let lastReplaced = last.replace(".", ",");
    return `$ ${first}${lastReplaced}`;
};

const cartController = {
    cart: async (req, res) => {        //GET - Muestra el carrito - Debe haber un usuario logueado
        try {
            const users = await db.Users.findAll();
            const items = await db.Cart_items.findAll({
                where: {
                    user_id: req.session.userLogged.id
                },
                include: [{association: "user"}, {association: "product"}]
            });
            if (items.length == 0) {
                const products = [];
                res.render("cart", {products, user: req.session.userLogged});
            } else {
                let productsInCart = [];
                items.forEach(item => {
                    let {product} = item;
                    productsInCart.push(product);
                });
                productsInCart.forEach(product => {
                    product.price = parseFloat(product.price);
                    users.forEach(user => {
                        if (user.id == product.user_id) {
                            product.seller = user.business_name;
                        }
                    });
                    items.forEach(item => {
                        if (item.product_id == product.id) {
                            product.quantity = item.quantity
                        }
                    });
                    product.subtotal = (product.price * (1 - (product.discount / 100))) * product.quantity;
                });
                const subTotalArray = productsInCart.map(prod => prod.price * prod.quantity);
                const subTotal = subTotalArray.reduce((acum, act) => acum + act);
                const discountArray = productsInCart.map(prod => {
                    if (prod.discount == 0) {
                        return 0;
                    } else {
                        return prod.price * (prod.discount / 100) * prod.quantity;
                    }
                });
                const discount = discountArray.reduce((acum,act) => acum + act);
                const total = subTotal - discount;
                res.render("cart", {user: req.session.userLogged, products: productsInCart, formatPrice, subTotal, discount, total});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged})
        }
    },
    add: async (req, res) => {          //POST - Agrega un producto al carrito - Debe haber un usuario logueado - Debe tener rol de comprador
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                let items = await db.Cart_items.findAll({
                    where: {
                        user_id: req.session.userLogged.id
                    }
                });
                if (items.length == 0) {
                    await db.Cart_items.create({
                        user_id: req.session.userLogged.id,
                        product_id: req.params.id,
                        quantity: req.body.quantity
                    });
                    res.redirect("/cart");
                } else {
                    let productExisting = false;
                    let quantity = 0;
                    items.forEach(item => {
                        if (item.product_id == req.params.id) {
                            quantity = parseInt(item.quantity);
                            productExisting = true;
                        }
                    });
                    if (productExisting) {
                        await db.Cart_items.update({
                            quantity: quantity + parseInt(req.body.quantity)
                        }, {
                            where: {
                                product_id: req.params.id
                            }
                        });
                        res.redirect("/cart");
                    } else {
                        await db.Cart_items.create({
                            user_id: req.session.userLogged.id,
                            product_id: req.params.id,
                            quantity: req.body.quantity
                        });
                        res.redirect("/cart");
                    }
                }
            } else {
                res.render("products/productDetail", {errors: errors.errors, user: req.session.userLogged});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    update: async (req, res) => {       //PUT - Actualiza un producto del carrito - Debe haber un usuario logueado - Debe tener rol de comprador
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                if (req.body.quantity == 0) {
                    await db.Cart_items.destroy({
                        where: {
                            product_id: req.params.id
                        }
                    });
                    res.redirect("/cart");
                } else {
                    await db.Cart_items.update({
                        quantity: req.body.quantity
                    }, {
                        where: {
                            product_id: req.params.id
                        }
                    });
                    res.redirect("/cart");
                }
            } else {
                res.render("products/productDetail", {errors: errors.errors, user: req.session.userLogged});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    delete: async (req, res) => {       //DELETE - Elimina un producto del carrito - Debe haber un usuario logueado - Debe tener rol de comprador
        try {
            await db.Cart_items.destroy({
                where: {
                    product_id: req.params.id
                }
            });
            res.redirect("/cart");
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    clean: async (req, res) => {        //DELETE - Vacía el carrito - Debe haber un usuario logueado - Debe tener rol de comprador
        try {
            await db.Cart_items.destroy({
                where: {
                    user_id: req.session.userLogged.id
                }
            });
            res.redirect("/cart");
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    }
};

module.exports = cartController;