module.exports = (sequelize, DataTypes) => {
    const Episode = sequelize.define(
        'Episode',
        {
            episodeNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            episodeTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            underscored: true
        }
    );

    Episode.associate = models => {
        Episode.hasMany(models.EpisodeReview, {
            foreignKey: {
                name: 'episodeId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        Episode.belongsTo(models.Novel, {
            foreignKey: {
                name: 'novelId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        Episode.hasMany(models.OrderItem, {
            foreignKey: {
                name: 'episodeId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        Episode.hasMany(models.Paragraph, {
            foreignKey: {
                name: 'episodeId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        Episode.hasMany(models.ReadHistory, {
            foreignKey: {
                name: 'episodeId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        Episode.belongsToMany(models.User, {
            through: models.Purchased
        });
    };

    return Episode;
};