module.exports = function(sequelize,dataTypes){

    let alias = "Categories";

    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true
        },
        name:{
            type:dataTypes.STRING
        },
        created_at:{
            type:dataTypes.DATE
        },
        updated_at:{
            type:dataTypes.DATE
        }
    };

    let config = {
        tablename: "Categories",
        timestamps: true
    };

    const Category = sequelize.define(alias,cols,config);

    //RELACIONES
    Category.associate=function(models){
        Category.hasMany(models.Products,{
            as:"products",
            foreignKey: "category_id"
        })
    };

    return Category;
}