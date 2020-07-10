module.exports = function(sequelize,dataTypes){

    let alias = "Role";

    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        name:{
            type:dataTypes.STRING(45),
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
        tablename: "roles",
        timestamps: true
    };

    const Role = sequelize.define(alias,cols,config);

    //RELACIONES
    Role.associate=function(models){
        Role.hasMany(models.User,{
            as: "users",
            foreignKey: "role_id"
        })
    };

    return Role;
}