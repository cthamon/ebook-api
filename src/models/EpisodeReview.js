module.exports = (sequelize, DataTypes) => {
    const EpisodeReview = sequelize.define(
        'EpisodeReview',
        {
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            underscored: true
        }
    );

    EpisodeReview.associate = models => {
        EpisodeReview.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        EpisodeReview.belongsTo(models.Episode, {
            foreignKey: {
                name: 'episodeId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    };

    return EpisodeReview;
};