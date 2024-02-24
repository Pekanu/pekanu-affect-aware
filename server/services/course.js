const joi = require("joi");

const Course = require("../models/course");
const QuizService = require("./quiz");
const UserCourseService = require("./userCourse");
const userCourse = require("../models/userCourse");

class CourseService {
  courseValidator(courseData) {
    const schema = joi.object({
      title: joi.string().required().min(3).max(200),
      description: joi.string().required().min(3).max(500),
      thumbnail: joi.string().required(),
      learnings: joi.string().min(10).max(1000),
    });

    return schema.validate(courseData);
  }

  courseUpdateValidator(courseData) {
    let schema = joi.object({
      title: joi.string().min(3).max(200),
      description: joi.string().min(3).max(500),
      thumbnail: joi.string(),
      learnings: joi.string().min(10).max(1000),
    });

    return schema.validate(courseData);
  }

  moduleValidator(moduleData) {
    const schema = joi.object({
      type: joi.string().required().valid("video", "quiz", "notes"),
      title: joi.string().required().min(3).max(200),
      description: joi.when("type", {
        is: "video",
        then: joi.string().required().min(3).max(500),
      }),
      videoUrl: joi.when("type", {
        is: "video",
        then: joi.string().required(),
      }),
      notesUrl: joi.when("type", {
        is: "notes",
        then: joi.string().required(),
      }),
      quiz: joi.when("type", {
        is: "quiz",
        then: joi.string().required().hex().length(24),
      }),
    });

    return schema.validate(moduleData);
  }

  moduleUpdateValidator(moduleData) {
    const schema = joi.object({
      type: joi.string().valid("video", "quiz", "notes"),
      title: joi.string().min(3).max(200),
      description: joi.when("type", {
        is: "video",
        then: joi.string().min(3).max(500),
      }),
      videoUrl: joi.when("type", {
        is: "video",
        then: joi.string(),
      }),
      notesUrl: joi.when("type", {
        is: "notes",
        then: joi.string(),
      }),
      quiz: joi.when("type", {
        is: "quiz",
        then: joi.string().hex().length(24),
      }),
    });

    return schema.validate(moduleData);
  }

  async createCourse(courseData) {
    let { value, error } = this.courseValidator(courseData);
    if (error) throw new Error(error);
    const newCourse = new Course(value);
    return await newCourse.save();
  }

  async updateCourse(courseId, courseData) {
    const { value, error } = this.courseUpdateValidator(courseData);
    if (error) throw new Error(error);
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: value },
      { new: true }
    );
    return updatedCourse;
  }

  async getCourseById(courseId, userId) {
    const course = await Course.findById(courseId)
      .populate("modules.quizzes")
      .populate("modules.quiz");
    const userCourseService = new UserCourseService();
    const isEnrolled = await userCourseService.isUserEnrolled(courseId, userId);

    return {
      course,
      isEnrolled,
    };
  }

  async getAllCourses() {
    return await Course.find()
      .populate("modules.quizzes")
      .populate("modules.quiz");
  }

  async deleteCourse(courseId) {
    await userCourse.findOneAndDelete({
      course: courseId,
    });
    return await Course.findByIdAndDelete(courseId);
  }

  async addModule(courseId, moduleData) {
    const { value, error } = this.moduleValidator(moduleData);
    if (error) throw new Error(error);

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { modules: value } },
      { new: true }
    );
    return updatedCourse;
  }

  async updateModule(courseId, moduleId, moduleData) {
    const { value, error } = this.moduleUpdateValidator(moduleData);
    if (error) throw new Error(error);

    const existingModule = await Course.findOne({
      _id: courseId,
      "modules._id": moduleId,
    });

    if (!existingModule) throw new Error("Module not found");

    if (!value.videoUrl){
      delete value.videoUrl;
    }

    if (!value.notesUrl){
      delete value.notesUrl;
    }

    const mergedModule = {
      ...existingModule.modules.id(moduleId).toObject(),
      ...value,
    };

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId, "modules._id": moduleId },
      { $set: { "modules.$": mergedModule } },
      { new: true }
    );
    return updatedCourse;
  }

  async deleteModule(courseId, moduleId) {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { modules: { _id: moduleId } } },
      { new: true }
    );
    return updatedCourse;
  }

  async addQuizToVideoModule(courseId, moduleId, quizData) {
    const quizService = new QuizService();
    const newQuiz = await quizService.createQuiz(quizData);
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId, "modules._id": moduleId },
      { $push: { "modules.$.quizzes": newQuiz._id } },
      { new: true }
    );
    return updatedCourse;
  }

  async removeQuizFromVideoModule(courseId, moduleId, quizId) {
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId, "modules._id": moduleId },
      { $pull: { "modules.$.quizzes": quizId } },
      { new: true }
    );
    return updatedCourse;
  }
}

module.exports = CourseService;
