module.exports = (sequelize, DataTypes) => {
    const UserFollow = sequelize.define(
        "UserFollow", {},
        {
            underscored: true
        }
    );

    return UserFollow;
}