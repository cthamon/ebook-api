module.exports = (sequelize, DataTypes) => {
    const Novel = sequelize.define(
        'Novel',
        {
            title: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            coverImg: {
                type: DataTypes.STRING
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

    Novel.associate = models => {
        Novel.hasMany(models.Episode, {
            foreignKey: {
                name: 'novelId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        Novel.belongsToMany(models.User, {
            as: "follower",
            through: models.NovelFollow
        });
        Novel.hasMany(models.NovelReview, {
            foreignKey: {
                name: 'novelId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        Novel.belongsToMany(models.NovelType, {
            foreignKey: {
                name: "novelId",
                allowNull: false
            },
            through: models.NovelTypeMap
        });
        Novel.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    };

    return Novel;
};