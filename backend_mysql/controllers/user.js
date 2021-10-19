const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('../Sequelize/sequelize').Sequelize;
const { User } = require('../Sequelize/sequelize');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            let data = {
                name,
                email,
                password
            };

            data.password = await bcrypt.hash(data.password, 10);

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
            var user = await User.findOne({
                attributes: ['id', 'password'],
                where: {
                    email
                }
            });

            if (!user) throw new Error('Email or password is incorrect');

            let isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) throw new Error('Invalid login credentials');

            let token = jwt.sign({ _id: user.id }, 'Test', { expiresIn: '1d' });
            res.status(200).send(token);
        } catch (e) {
            console.log(e);
            res.send(e.message);
        }
    },

    getProfile: async (req, res) => {
        try {
            var user = await User.findOne({
                attributes: ['id', ['id', '_id'], 'name', 'email'],
                where: {
                    id: req.token._id
                }
            });
            res.status(200).send(user);
        } catch (e) {
            console.log(e);
            res.send(e.message);
        }
    },

    getUserList: async (req, res) => {
        try {
            var users = await User.findAll({
                attributes: ['id', ['id', '_id'], 'name', 'email'],
                where: {
                    id: {
                        [Op.ne]: req.token._id
                    }
                }
            });
            res.status(200).send(users);
        } catch (e) {
            console.log(e);
            res.send(e.message);
        }
    }
}