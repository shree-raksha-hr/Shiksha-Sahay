const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatController = {
  getChatInterface(req, res) {
    const user = req.session.user;
    res.render('chat/index', { user });
  },

  async sendMessage(req, res) {
    try {
      const { message } = req.body;
      const user = req.session.user;

      if (!user) {
        return res.status(401).json({ success: false, error: 'Not logged in' });
      }

      console.log('🔹 User message:', message);

      // Create model instance
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Send prompt to Gemini
      const result = await model.generateContent(
        `You are a very kind teacher and i am a school student. reply to the question provided. Be very informative and kind. do not use markdown
        question - ${message}`
      );

      const aiText = result.response.text() || 'No response';

      res.json({
        success: true,
        aiResponse: aiText,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Gemini API Error:', error.message || error.stack);
      res.status(500).json({ success: false, error: 'Failed to generate response' });
    }
  }
};

module.exports = chatController;
