module.exports = function(sequelize,dataTypes){

    let alias = "Product";

    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        code:{
            type:dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        name:{
            type:dataTypes.STRING(100),
            allowNull: false,
        },
        description:{
            type:dataTypes.STRING(300),
            allowNull: false
        },
        price:{
            type:dataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        discount:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        stock:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        image:{
            type:dataTypes.STRING(45),
            allowNull: false
        },
        user_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        category_id:{
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
        },
    };

    let config = {
        tablename: "products",
        timestamps: true
    };

    const Product = sequelize.define(alias,cols,config);

    Product.associate=function(models){
        Product.belongsTo(models.Category,{
            as: "categories",
            foreignKey: "category_id"
        }),

        Product.belongsTo(models.User,{
            as: "users",
            foreignKey: "user_id"
        }),

        Product.hasMany(models.CartItem,{
            as: "cart_items",
            foreignKey: "product_id"
        }),

        Product.belongsToMany(models.Order,{
            as: "orders",
            through: "product_order",
            foreignKey: "product_id",
            otherKey: "order_id",
            timestamps: true
        })
    };

    return Product;
}