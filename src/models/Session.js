module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define(
        "Session",
        {
            valid: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            userAgent: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            underscored: true
        }
    );

    Session.associate = models => {
        Session.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    };

    return Session;
}