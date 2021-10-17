const User = require('../schemas/user');
const mongoose = require('mongoose');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            let data = {
                _id: new mongoose.Types.ObjectId(),
                name,
                email,
                password
            };

            await User.create(data);

            res.status(200).send('User created.');
        } catch (e) {
            console.log(e);
            res.status(400).send(e.message);
        }
    },


    getToken: async (req, res) => {
        try {
            const { email, password } = req.body;
            var user = await User.findUserByCredentials(email, password);
            if (!user) throw new Error('Email or password is incorrect');
            let token = await user.generateAuthToken();
            res.status(200).send(token);
        } catch (e) {
            console.log(e);
            res.send(e.message);
        }
    },

    getProfile: async (req, res) => {
        try {
            var user = await User.getProfile(req.token._id);
            res.status(200).send(user);
        } catch (e) {
            console.log(e);
            res.send(e.message);
        }
    },

    getUserList: async (req, res) => {
        try {
            var users = await User.getUserList(req.token._id);
            res.status(200).send(users);
        } catch (e) {
            console.log(e);
            res.send(e.message);
        }
    }
}