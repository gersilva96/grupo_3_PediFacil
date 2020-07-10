module.exports = function(sequelize,dataTypes){

    let alias = "productOrder";

    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        total_cost:{
            type:dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        unit_cost:{
            type:dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        quantity:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        order_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        created_at:{
            type:dataTypes.DATE,
            allowNull: false
        },
        updated_at:{
            type:dataTypes.DATE,
            allowNull: false
        }
    };

    let config = {
        tablename: "product_order",
        timestamps: true
    };

    const ProductOrder = sequelize.define(alias,cols,config);

    ProductOrder.associate=function(models){
        Order.belongsToMany(models.Product,{
            as: "products",
            through: "product_order",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: true
        }),

        Product.belongsToMany(models.Order,{
            as: "orders",
            through: "product_order",
            foreignKey: "product_id",
            otherKey: "order_id",
            timestamps: true
        })
    };

    return ProductOrder;
}