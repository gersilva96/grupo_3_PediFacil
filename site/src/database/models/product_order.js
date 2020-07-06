module.exports = function(sequelize,dataTypes){

    let alias = "productOrder";

    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        cost:{
            type:dataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
        quantity:{
            type:dataTypes.INTEGER
        },
        created_at:{
            type:dataTypes.DATE
        },
        updated_at:{
            type:dataTypes.DATE
        },
        order_id:{
            type:dataTypes.INTEGER
        },
        product_id:{
            type:dataTypes.INTEGER
        }
    };

    let config = {
        tablename: "product_order",
        timestamps: true
    };

    const product_order = sequelize.define(alias,cols,config);

    //RELACIONES
    product_order.associate=function(models){
        Order.belongsToMany(models.Products,{ //alias
            as:"products",
            through:"product_order",
            foreignKey: "order_id",
            otherKey:"product_id",
            timestamps: true
        }),

        Product.belongsToMany(models.Orders,{ //alias
            as:"orders",
            through:"product_order",
            foreignKey: "product_id",
            otherKey:"order_id",
            timestamps: true
        })
    };

    return product_order;
}