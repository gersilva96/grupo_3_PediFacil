module.exports = (sequelize, dataTypes) => {

    const alias = "Addresses";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        street: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        number: {
            type: dataTypes.INTEGER(50),
            allowNull: false
        },
        floor: {
            type: dataTypes.STRING(40)
        },
        apartment: {
            type: dataTypes.STRING(40)
        },
        between_streets: {
            type: dataTypes.STRING(100)
        },
        city: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        province: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        phone: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    };

    const config = {
        tableName: "addresses"
    };

    const Address = sequelize.define(alias, cols, config);

    //RELACIONES
    Address.associate = (models) => {
        Address.belongsTo(models.Users, {
            as: "user",
            foreignKey: "user_id"
        });
        Address.hasMany(models.Orders, {
            as: "orders",
            foreignKey: "address_id"
        });
    };

    return Address;
}