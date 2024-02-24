const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  answer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
});

const quizSchema = new Schema(
  {
    questions: [questionSchema],
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema);
