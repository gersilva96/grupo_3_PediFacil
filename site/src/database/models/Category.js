module.exports = function(sequelize,dataTypes){

    let alias = "Category";

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
        tablename: "categories",
        timestamps: true
    };

    const Category = sequelize.define(alias,cols,config);

    //RELACIONES
    Category.associate=function(models){
        Category.hasMany(models.Product,{
            as: "products",
            foreignKey: "category_id"
        })
    };

    return Category;
}