module.exports = (sequelize, DataTypes) => {

    let Chat = sequelize.define('chats', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        text: {
            type: DataTypes.STRING(500),
            allowNull: false
        },

        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW()
        },

        senderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: "id"
            }
        },

        recieverId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: "id"
            }
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

    return Chat;
}