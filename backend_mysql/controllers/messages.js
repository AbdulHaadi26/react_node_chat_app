
const { Op } = require('../Sequelize/sequelize').Sequelize;
const { Chat } = require('../Sequelize/sequelize');

module.exports = {
    createMessage: async (req, res) => {
        try {
            const { text, user_id, name } = req.body;

            let data = {
                text,
                sender: req.token._id,
                reciever: user_id,
                date: new Date(Date.now())
            };

            let tempMessage = await Chat.create(data);

            data.sender = {
                _id: req.token._id,
                name
            }

            data.id = tempMessage.id;
            data._id = tempMessage._id;

            res.status(200).send(data);
        } catch (e) {
            console.log(e);
            res.status(400).send(e.message);
        }
    },

    getAllMessages: async (req, res) => {
        try {
            var messages = await Chat.findAll({
                attributes: ['id', ['id', '_id'], 'text', 'senderId', ['recieverId', 'reciever']],
                where: {
                    [Op.or]: [
                        {
                            senderId: req.token._id,
                            recieverId: req.query.user_id
                        },
                        {
                            recieverId: req.token._id,
                            senderId: req.query.user_id
                        }
                    ]
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            res.status(200).send(messages);
        } catch (e) {
            console.log(e);
            res.send(e.message);
        }
    },
}