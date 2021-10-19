module.exports = function (db) {
    db.Chat.belongsTo(db.User, {
        foreignKey: 'senderId',
        targetKey: 'id',
        as: 'sender'
    });
}