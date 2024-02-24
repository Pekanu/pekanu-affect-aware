const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  title: String,
  description: String,
  type: {
    type: String,
    enum: ['video', 'quiz', 'notes'],
    required: true,
  },
  notesUrl: String,
  videoUrl: String,
  quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
});

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    modules: [moduleSchema],
    learnings: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
