const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    date: {
        type: Date, default: Date.now
    },
});


MessageSchema.statics.getAllMessages = async (_id, user_id) => {
    const messages = await Message.find({
        $or: [
            {
                sender: _id, reciever: user_id
            },
            {
                reciever: _id, sender: user_id
            }
        ]
    }).populate([
        {
            path: 'sender', model: 'users', select: {
                '_id': 1, 'name': 1,
            }
        }
    ]);
    if (!messages) return [];
    return messages;
};



module.exports = Message = mongoose.model("messages", MessageSchema, "messages");