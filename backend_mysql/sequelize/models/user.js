module.exports = (sequelize, DataTypes) => {

    let User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(500),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(500),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        active: {
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: 'T'
        },

        deleted: {
            type: DataTypes.CHAR(1),
            defaultValue: 'F'
        },

    },
        {
            timestamp: true,
            freezeTableName: true,
            updatedAt: false,
            createdAt: 'created',
        })

    return User;
}