const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science']
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'video', 'audio']
  },
  content: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Material', materialSchema);