const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true, minlength: 6 },
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 10);
    next();
});

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Test", { expiresIn: '30d' });
    return token;
};

UserSchema.statics.findUserByCredentials = async (value, password) => {
    const user = await User.findOne({ email: value }, { _id: 1, password: 1 });
    if (!user) throw new Error('Invalid login credentials');
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) throw new Error('Invalid login credentials');
    return user;
};

UserSchema.statics.getProfile = async (_id) => {
    const user = await User.findOne({ _id }, { name: 1, email: 1 });
    if (!user) throw new Error('User not found');
    return user;
};

UserSchema.statics.getUserList = async (_id) => {
    const users = await User.find({
        _id: {
            $ne: _id
        }
    }, { name: 1, email: 1 });
    if (!users) throw new Error('Users not found');

    return users;
};


module.exports = User = mongoose.model("users", UserSchema, "users");