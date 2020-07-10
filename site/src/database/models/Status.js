module.exports = function(sequelize,dataTypes){

    let alias = "Status";

    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        name:{
            type:dataTypes.STRING(50),
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
        tablename: "statuses",
        timestamps: true
    };

    const Status = sequelize.define(alias,cols,config);

    //RELACIONES
    Status.associate=function(models){
        Status.hasMany(models.Order,{
            as: "orders",
            foreignKey: "status_id"
        })
    };

    return Status;
}