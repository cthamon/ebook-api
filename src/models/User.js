module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            // id: {
            //     type: DataTypes.UUID,
            //     defaultValue: DataTypes.UUIDV4,
            //     allowNull: false,
            //     primaryKey: true
            // },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            writerName: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            profileImg: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            underscored: true
        }
    );

    User.associate = models => {
        User.hasMany(models.EpisodeReview, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        });
        User.hasMany(models.Novel, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        User.belongsToMany(models.Novel, {
            through: models.NovelFollow
        });
        User.hasMany(models.NovelReview, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        });
        User.hasMany(models.Order, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        });
        User.belongsToMany(models.Episode, {
            through: models.Purchased
        });
        User.hasMany(models.ReadHistory, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        });
        User.hasMany(models.Session, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        });
        User.belongsToMany(models.User, {
            as: "follower",
            foreignKey: {
                name: "followerId",
                allowNull: false
            },
            through: models.UserFollow
        });
        User.belongsToMany(models.User, {
            as: "following",
            foreignKey: {
                name: "followingId",
                allowNull: false
            },
            through: models.UserFollow
        });
    };

    return User;
};