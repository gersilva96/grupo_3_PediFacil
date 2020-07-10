module.exports = function(sequelize,dataTypes){

    let alias = "CartItem";

    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        user_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        quantity:{
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
        tablename: "cart_items",
        timestamps: true
    };

    const CartItem = sequelize.define(alias,cols,config);

    //RELACIONES
    CartItem.associate=function(models){
        CartItem.belogsTo(models.User,{
            as: "users",
            foreignKey: "user_id"
        }),

        CartItem.belogsTo(models.Product,{
            as: "products",
            foreignKey: "product_id"
        })
    };

    return CartItem;
}