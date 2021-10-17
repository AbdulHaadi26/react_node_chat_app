const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/jwt');
const {
    createUser,
    getToken,
    getProfile,
    getUserList
} = require('../controllers/user');

router.put('/register', createUser);
router.post('/auth', getToken);
router.get('/profile', JWT, getProfile);
router.get('/all', JWT, getUserList);

module.exports = router;