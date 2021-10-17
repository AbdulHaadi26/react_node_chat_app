const Message = require('../schemas/messages');
const mongoose = require('mongoose');

module.exports = {
    createMessage: async (req, res) => {
        try {
            const { text, user_id, name } = req.body;

            let data = {
                _id: new mongoose.Types.ObjectId(),
                text,
                sender: req.token._id,
                reciever: user_id,
                date: new Date(Date.now())
            };

            await Message.create(data);

            data.sender = {
                _id: req.token._id,
                name
            }

            res.status(200).send(data);
        } catch (e) {
            console.log(e);
            res.status(400).send(e.message);
        }
    },

    getAllMessages: async (req, res) => {
        try {
            var messages = await Message.getAllMessages(req.token._id, req.query.user_id);
            res.status(200).send(messages);
        } catch (e) {
            console.log(e);
            res.send(e.message);
        }
    },

}