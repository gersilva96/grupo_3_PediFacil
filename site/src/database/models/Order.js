module.exports = function(sequelize,dataTypes){

    let alias = "Orders";

    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        date_order:{
            type:dataTypes.DATE,
        },
        total_cost:{
            type:dataTypes.DECIMAL(8, 2),
        },
        created_at:{
            type:dataTypes.DATE
        },
        updated_at:{
            type:dataTypes.DATE
        },
        user_id:{
            type:dataTypes.INTEGER
        }
    };

    let config = {
        tablename: "Orders",
        timestamps: true
    };

    const Order = sequelize.define(alias,cols,config);

    //RELACIONES
    Order.associate=function(models){
        Order.belongsTo(models.Users,{ //alias
            as:"users",
            foreignKey: "user_id"
        }),

        Order.belongsToMany(models.Products,{ //alias
            as:"products",
            through:"product_order",
            foreignKey: "order_id",
            otherKey:"product_id",
            timestamps: true
        })
    };

    return Order;
}