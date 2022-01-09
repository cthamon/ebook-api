module.exports = (sequelize, DataTypes) => {
    const NovelFollow = sequelize.define(
        "NovelFollow", {}, {
        underscored: true
    }
    );

    return NovelFollow;
}