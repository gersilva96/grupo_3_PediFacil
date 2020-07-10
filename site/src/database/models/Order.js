module.exports = function(sequelize,dataTypes){

    let alias = "Order";

    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        order_date:{
            type:dataTypes.DATE,
            allowNull: false
        },
        order_total:{
            type:dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        user_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        address_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        status_id:{
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
        tablename: "orders",
        timestamps: true
    };

    const Order = sequelize.define(alias,cols,config);

    Order.associate=function(models){
        Order.belongsTo(models.Address,{
            as: "addresses",
            foreignKey: "address_id"
        }),

        Order.belongsTo(models.User,{
            as: "users",
            foreignKey: "user_id"
        }),

        Order.belongsTo(models.Status,{
            as: "statuses",
            foreignKey: "status_id"
        }),

        Order.belongsToMany(models.Product,{
            as: "products",
            through: "product_order",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: true
        })
    };

    return Order;
}