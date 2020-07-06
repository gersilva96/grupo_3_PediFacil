module.exports = function(sequelize,dataTypes){

    let alias = "Types";

    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        admin:{
            type:dataTypes.BOOLEAN,
            allowNull: false,
        },
        created_at:{
            type:dataTypes.DATE
        },
        updated_at:{
            type:dataTypes.DATE
        }
    };

    let config = {
        tablename: "Types",
        timestamps: true
    };

    const Type = sequelize.define(alias,cols,config);

    //RELACIONES
    Type.associate=function(models){
        Type.hasMany(models.Users,{ //ALIAS
            as:"users",
            foreignKey: "type_id"
        })
    };

    return Type;
}