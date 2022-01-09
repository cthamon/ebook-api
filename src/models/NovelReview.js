module.exports = (sequelize, DataTypes) => {
    const NovelReview = sequelize.define(
        'NovelReview',
        {
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            underscored: true
        }
    );

    NovelReview.associate = models => {
        NovelReview.belongsTo(models.Novel, {
            foreignKey: {
                name: 'novelId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        NovelReview.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
                unique: true
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    };

    return NovelReview;
};