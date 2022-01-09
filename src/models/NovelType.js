module.exports = (sequelize, DataTypes) => {
    const NovelType = sequelize.define(
        'NovelType',
        {
            novelType: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
            },
        },
        {
            underscored: true,
            timestamps: false
        }
    );

    NovelType.associate = models => {
        NovelType.belongsToMany(models.Novel, {
            foreignKey: {
                name: "novelTypeId",
                allowNull: false
            },
            through: models.NovelTypeMap
        });
    };

    return NovelType;
}