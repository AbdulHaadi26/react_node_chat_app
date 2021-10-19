const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/jwt');

const {
    createMessage,
    getAllMessages
} = require('../controllers/messages');

router.put('/register', JWT, createMessage);
router.get('/all', JWT, getAllMessages);

module.exports = router;