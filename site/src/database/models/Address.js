module.exports = function(sequelize,dataTypes){

    let alias = "Address";

    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        first_line:{
            type:dataTypes.STRING(50),
            allowNull: false
        },
        second_line:{
            type:dataTypes.STRING(50)
        },
        between_streets:{
            type:dataTypes.STRING(100)
        },
        city:{
            type:dataTypes.STRING(50),
            allowNull: false
        },
        phone:{
            type:dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        user_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
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
        tablename: "addresses",
        timestamps: true
    };

    const Address = sequelize.define(alias,cols,config);

    //RELACIONES
    Address.associate=function(models){
        Address.belongsTo(models.User,{
            as: "users",
            foreignKey: "user_id"
        })

        Address.hasMany(models.Order,{
            as: "orders",
            foreignKey: "address_id"
        })
    };

    return Address;
}