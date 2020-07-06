module.exports = function(sequelize,dataTypes){

    let alias = "Users";

    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        business_name:{
            type:dataTypes.STRING,
        },
        email:{
            type:dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        first_name:{
            type:dataTypes.STRING,
            allowNull: false,
        },
        last_name:{
            type:dataTypes.STRING,
            allowNull: false,
        },
        password:{
            type:dataTypes.STRING,
            allowNull: false,
        },
        image:{
            type:dataTypes.STRING
        },
        street_name:{
            type:dataTypes.STRING
        },
        street_number:{
            type:dataTypes.STRING
        },
        created_at:{
            type:dataTypes.DATE
        },
        updated_at:{
            type:dataTypes.DATE
        },
        type_id:{
            type:dataTypes.INTEGER,
            allowNull: false,
        }
    };

    let config = {
        tablename: "Users",
        timestamps: true
    };

    const User = sequelize.define(alias,cols,config);

    //RELACIONES
    User.associate=function(models){
        User.belongsTo(models.Types,{ //alias
            as:"types",
            foreignKey: "type_id"
        }),

        User.hasMany(models.Orders,{ //alias
            as:"orders",
            foreignKey: "user_id"
        })
    };

    return User;
}