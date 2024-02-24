const joi = require('joi');

const UserCourse = require('../models/userCourse');

class UserCourseService {
  userCourseValidator(userCourseData) {
    const schema = joi.object({
      course: joi.string().required().hex().length(24),
      user: joi.string().required().hex().length(24),
    });
    return schema.validate(userCourseData);
  }

  progressValidator(progressData) {
    const schema = joi.object({
      module: joi.string().required().hex().length(24),
      quizzes: joi.array().items(
        joi.object({
          quiz: joi.string().required().hex().length(24),
          score: joi.number(),
        })
      ),
      timeSpent: joi.number().default(0),
    });
    return schema.validate(progressData);
  }

  async isUserEnrolled(courseId, userId) {
    const userCourse = await UserCourse.findOne({
      course: courseId,
      user: userId,
    });

    if (userCourse) {
      return true;
    }
    return false;
  }

  async createUserCourse(courseId, userId) {
    const isUserEnrolled = await this.isUserEnrolled(courseId, userId);

    if (isUserEnrolled) throw new Error('User already enrolled');

    const { value, error } = this.userCourseValidator({
      course: courseId,
      user: userId,
    });
    if (error) throw new Error(error);

    const newUserCourse = new UserCourse(value);
    return await newUserCourse.save();
  }

  async userCourseCompleted(courseId, userId) {
    const updatedUserCourse = await UserCourse.findOneAndUpdate(
      { course: courseId, user: userId },
      { completed: true },
      { new: true }
    );

    return updatedUserCourse;
  }

  async updateRecentModule(courseId, userId, moduleId) {
    const updatedUserCourse = await UserCourse.findOneAndUpdate(
      { course: courseId, user: userId },
      { lastAccessed: { module: moduleId, timestamp: Date.now() } },
      { new: true }
    );

    return updatedUserCourse;
  }

  async addProgress(courseId, userId, progressData) {
    this.progressValidator(progressData);

    const updatedUserCourse = await UserCourse.findOneAndUpdate(
      { course: courseId, user: userId },
      { $push: { progress: progressData } },
      { new: true }
    );

    return updatedUserCourse;
  }

  async getCourseProgress(courseId, userId) {
    console.log(courseId, userId);
    const userCourse = await UserCourse.findOne({
      course: courseId,
      user: userId,
    }).populate('course');

    return userCourse;
  }

  async getAllCoursesProgress(userId) {
    const userCourses = await UserCourse.find({ user: userId }).populate(
      'course'
    );

    return userCourses.map(userCourse => {
      return {
        course: userCourse.course,
        progress: userCourse.progress,
      };
    });
  }
}

module.exports = UserCourseService;
