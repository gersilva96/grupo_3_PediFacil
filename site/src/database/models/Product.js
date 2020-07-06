module.exports = function(sequelize,dataTypes){

    let alias = "Products";

    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        name:{
            type:dataTypes.STRING,
            allowNull: false,
        },
        description:{
            type:dataTypes.STRING
        },
        price:{
            type:dataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
        discount:{
            type:dataTypes.INTEGER
        },
        stock:{
            type:dataTypes.INTEGER
        },
        image:{
            type:dataTypes.STRING
        },
        created_at:{
            type:dataTypes.DATE
        },
        updated_at:{
            type:dataTypes.DATE
        },
        category_id:{
            type:dataTypes.INTEGER
        }
    };

    let config = {
        tablename: "Products",
        timestamps: true
    };

    const Product = sequelize.define(alias,cols,config);

    //RELACIONES
    Product.associate=function(models){
        Product.belongsTo(models.Categories,{ //alias
            as:"categories",
            foreignKey: "category_id"
        }),

        Product.belongsToMany(models.Orders,{ //alias
            as:"orders",
            through:"product_order",
            foreignKey: "product_id",
            otherKey:"order_id",
            timestamps: true
        })
    };

    return Product;
}