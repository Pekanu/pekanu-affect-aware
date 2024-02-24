const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema(
  {
    module: { type: Schema.Types.ObjectId, ref: 'Module', unique: true },
    quizzes: [
      {
        quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
        score: {
          type: Number,
        },
      },
    ],
    timeSpent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const userCourseSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  completed: {
    type: Boolean,
    default: false,
  },
  lastAccessed: {
    module: { type: mongoose.Schema.Types.ObjectId },
    timestamp: { type: Date },
  },
  progress: [progressSchema],
});

module.exports = mongoose.model('UserCourse', userCourseSchema);
