const joi = require('joi');

const Quiz = require('../models/quiz');

class QuizService {
  quizValidator(quizData) {
    const schema = joi.object({
      questions: joi.array().items(
        joi.object({
          question: joi.string().required().min(3).max(500),
          options: joi.array().items(joi.string().required().min(1).max(200)),
          answer: joi.string().required().min(1).max(200),
          explanation: joi.string().required().min(3).max(1000),
        })
      ),
      time: joi.string(),
    });

    return schema.validate(quizData);
  }

  async createQuiz(quizData) {
    const { value, error } = this.quizValidator(quizData);
    if (error) throw new Error(error);
    const newQuiz = new Quiz(value);
    return await newQuiz.save();
  }

  async updateQuiz(quizId, quizData) {
    const { value, error } = this.quizValidator(quizData);
    if (error) throw new Error(error);

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, value, {
      new: true,
    });

    return updatedQuiz;
  }

  async getQuizById(quizId) {
    return await Quiz.findById(quizId);
  }

  async deleteQuiz(quizId) {
    return await Quiz.findByIdAndDelete(quizId);
  }
}

module.exports = QuizService;
