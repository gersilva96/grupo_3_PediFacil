module.exports = function(sequelize,dataTypes){

    let alias = "User";

    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        business_name:{
            type:dataTypes.STRING(50),
            allowNull: false,
        },
        email:{
            type:dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        first_name:{
            type:dataTypes.STRING(50),
            allowNull: false
        },
        last_name:{
            type:dataTypes.STRING(50),
            allowNull: false
        },
        password:{
            type:dataTypes.STRING(100),
            allowNull: false
        },
        image:{
            type:dataTypes.STRING(50),
            allowNull: false
        },
        role:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        created_at:{
            type:dataTypes.DATE
        },
        updated_at:{
            type:dataTypes.DATE
        },
    };

    let config = {
        tablename: "users",
        timestamps: true
    };

    const User = sequelize.define(alias,cols,config);

    //RELACIONES
    User.associate=function(models){
        User.belongsTo(models.Role,{
            as:"roles",
            foreignKey: "role_id"
        }),

        User.hasMany(models.Order,{
            as: "orders",
            foreignKey: "user_id"
        }),

        User.hasMany(models.Product,{
            as: "products",
            foreignKey: "user_id"
        }),

        User.hasMany(models.CartItem,{
            as: "cart_items",
            foreignKey: "user_id"
        }),

        User.hasMany(models.Order,{
            as: "orders",
            foreignKey: "user_id"
        })
    };

    return User;
}