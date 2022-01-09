module.exports = (sequelize, DataTypes) => {
    const NovelTypeMap = sequelize.define(
        'NovelTypeMap', {},
        {
            underscored: true,
            timestamps: false
        }
    );

    return NovelTypeMap;
}