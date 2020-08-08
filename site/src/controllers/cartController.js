const db = require("../database/models");
const { validationResult } = require("express-validator");
const querystring = require("querystring");

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
                res.render("cart/cart", {products, user: req.session.userLogged});
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
                if(req.query.error != undefined) {
                    const mensaje = "Controle el pedido: hay productos que no se ingresaron o se ingresaron con menor cantidad a la solicitada. Puede dirigirse al carrito para controlarlo";
                    res.render("cart/cart", {mensaje, user: req.session.userLogged, products: productsInCart, formatPrice, subTotal, discount, total});
                } else {
                    res.render("cart/cart", {user: req.session.userLogged, products: productsInCart, formatPrice, subTotal, discount, total});
                }
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
    },
    select: async (req, res) => {       //GET - Muestra las direcciones usadas anteriormente y un botón para agregar una nueva - Debe haber un usuario logueado - Debe tener rol de comprador - Debe tener al menos una dirección cargada con anterioridad
        try {
            const addresses = await db.Addresses.findAll({
                where: {
                    user_id: req.session.userLogged.id
                }
            });
            res.render("cart/selectAddress", {addresses, user: req.session.userLogged});
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    address: async (req, res) => {      //GET - Muestra el formulario de agregar dirección para la compra - Debe haber un usuario logueado - Debe tener rol de comprador
        try {
            res.render("cart/addAddress", {user: req.session.userLogged});
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    newAddress: async (req, res) => {       //POST - Guarda una nueva dirección en session - Debe haber un usuario logueado - Debe tener rol de comprador
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                await db.Addresses.create({
                    street: req.body.street,
                    number: parseInt(req.body.number),
                    floor: req.body.floor,
                    apartment: req.body.apartment,
                    between_streets: req.body.between_streets,
                    city: req.body.city,
                    province: req.body.province,
                    phone: req.body.phone,
                    user_id: req.session.userLogged.id
                });
                const address = await db.Addresses.findOne({
                    where: {user_id: req.session.userLogged.id},
                    order: [["createdAt", "DESC"]]
                });
                req.session.selectedAddressId = address.id;
                res.redirect("/cart/finally");
            } else {
                res.render("cart/addAddress", {errors: errors.errors, user: req.session.userLogged});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    existingAddress: async (req, res) => {      //POST - Guarda una dirección existente en session - Debe haber un usuario logueado - Debe tener rol de comprador
        try {
            const errors = validationResult(req);
            const addresses = await db.Addresses.findAll({
                where: {
                    user_id: req.session.userLogged.id
                }
            });
            if (errors.isEmpty()) {
                const address = await db.Addresses.findByPk(parseInt(req.body.selected_address));
                if (address == undefined) {
                    res.render("cart/selectAddress", {addresses, errors: [{msg: "Estás intentando seleccionar una dirección que no te pertenece"}], user: req.session.userLogged});
                } else {
                    if (address.user_id == req.session.userLogged.id) {
                        req.session.selectedAddressId = address.id;
                        res.redirect("/cart/finally");
                    } else {
                        res.render("cart/selectAddress", {addresses, errors: [{msg: "Estás intentando seleccionar una dirección que no te pertenece"}], user: req.session.userLogged});
                    }
                }
            } else {
                res.render("cart/selectAddress", {addresses, errors: errors.errors, user: req.session.userLogged});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    finally: async (req, res) => {      //GET  - Muestra el resumen de compra antes de finalizarla - Debe haber un usuario logueado - Debe tener rol de administrador - Debe haber una dirección en session
        try {
            res.render("cart/finally", {user: req.session.userLogged});
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    purchase: async (req, res) => {     //POST - Ejecuta la compra - Debe haber un usuario logueado - Debe tener rol de comprador - Debe haber una dirección en session
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                const items = await db.Cart_items.findAll({
                    where: {user_id: req.session.userLogged.id},
                    include: [{association: "product"}]
                });
                let orderNumber;
                const lastOrder = await db.Orders.findOne({
                    order: [["createdAt", "DESC"]]
                });
                if (lastOrder == undefined || (lastOrder != undefined && lastOrder.length == 0)) {
                    orderNumber = 1;
                } else {
                    orderNumber = lastOrder.order_number + 1;
                }
                await db.Orders.create({
                    order_number: orderNumber,
                    order_date: new Date(),
                    order_description: req.body.order_description,
                    user_id: req.session.userLogged.id,
                    address_id: req.session.selectedAddressId,
                    status_id: 1
                });
                const order = await db.Orders.findOne({
                    where: { user_id: req.session.userLogged.id },
                    order: [["createdAt", "DESC"]]
                });
                let total = 0;
                await items.forEach(item => {
                    db.Product_orders.create({
                        total_cost: (parseFloat(item.product.price) * (1 - (item.product.discount / 100))) * item.quantity,
                        unit_cost: parseFloat(item.product.price) * (1 - (item.product.discount / 100)),
                        quantity: item.quantity,
                        product_id: item.product_id,
                        order_id: order.id
                    });
                    total += (parseFloat(item.product.price) * (1 - (item.product.discount / 100))) * item.quantity;
                });
                await db.Orders.update({
                    order_total: total,
                }, {
                    where: {
                        id: order.id
                    }
                });
                for (let i = 0; i < items.length; i++) {
                    let product = await db.Products.findByPk(items[i].product_id);
                    let stock = product.stock;
                    await db.Products.update({
                        stock: (stock - items[i].quantity)
                    }, {
                        where: {
                            id: items[i].product_id
                        }
                    });
                }
                await db.Cart_items.destroy({
                    where: {
                        user_id: req.session.userLogged.id
                    }
                });
                req.session.selectedAddressId = undefined;
                const query = querystring.stringify({
                    "success": "true"
                });
                res.redirect(`/products/all-products?${query}`);
            } else {
                res.render("cart/finally", {errors: errors.errors, user: req.sesion.userLogged});
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    },
    repeatPurchase: async (req, res) => {       //POST - Repite una compra anterior si hay stock suficiente - Debe haber un usuario logueado - Debe tener rol de comprador
        try {
            const order = await db.Orders.findByPk(req.params.id);
            if (order == undefined || (order != undefined && order.user_id != req.session.userLogged.id)) {
                const orders = await db.Orders.findAll({
                    where: {
                        user_id: req.session.userLogged.id
                    }
                });
                res.render("users/purchaseHistory", {mensaje: "Error al procesar la compra", orders, user: req.session.userLogged});
            } else {
                const orderProducts = await db.Product_orders.findAll({
                    where: {
                        order_id: req.params.id
                    }
                });
                await db.Cart_items.destroy({
                    where: {
                        user_id: req.session.userLogged.id
                    }
                });
                let itemsOutOfStock = 0;
                for (let i = 0; i < orderProducts.length; i++) {
                    const product = await db.Products.findByPk(orderProducts[i].product_id);
                    if (orderProducts[i].quantity <= product.stock) {
                        await db.Cart_items.create({
                           user_id: req.session.userLogged.id,
                           product_id: orderProducts[i].product_id,
                           quantity: orderProducts[i].quantity
                        });
                    } else if (orderProducts[i].quantity > product.stock && product.stock > 0) {
                        await db.Cart_items.create({
                            user_id: req.session.userLogged.id,
                            product_id: orderProducts[i].product_id,
                            quantity: product.stock
                        });
                        itemsOutOfStock++;
                    } else {
                        itemsOutOfStock++;
                    }
                }
                if (itemsOutOfStock > 0) {
                    const query = querystring.stringify({
                        "error": "true"
                    });
                    res.redirect(`/cart?${query}`);
                } else {
                    res.redirect("/cart");
                }
            }
        } catch(error) {
            res.render("error", {message: error, user: req.session.userLogged});
        }
    }
};

module.exports = cartController;