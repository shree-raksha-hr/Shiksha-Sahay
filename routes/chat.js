const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Chat interface (Students only)
router.get('/', chatController.getChatInterface);

// Send message to Gemini AI
router.post('/send', chatController.sendMessage);

module.exports = router;
