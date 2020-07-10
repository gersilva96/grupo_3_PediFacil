module.exports = (sequelize,dataTypes) => {

    const alias = "Product_order";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        total_cost: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        unit_cost: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        order_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    const config = {
        tableName: "product_order"
    };

    const ProductOrder = sequelize.define(alias, cols, config);

    ProductOrder.associate = (models) => {
        /*Order.belongsToMany(models.Products, {
            as: "products",
            through: "product_order",
            foreignKey: "order_id",
            otherKey: "product_id"
        });

        Product.belongsToMany(models.Orders, {
            as: "orders",
            through: "product_order",
            foreignKey: "product_id",
            otherKey: "order_id"
        });*/
    };

    return ProductOrder;
}