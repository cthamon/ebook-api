module.exports = (sequelize, DataTypes) => {
    const Purchased = sequelize.define(
        "Purchased", {},
        {
            underscored: true
        }
    );

    return Purchased;
}