const CourseService = require('../services/course');
const QuizService = require('../services/quiz');

const courseServices = new CourseService();
const quizServices = new QuizService();

exports.createCourse = async (req, res, next) => {
  try {
    const courseData = req.body;
    const newCourse = await courseServices.createCourse({
      ...courseData,
      thumbnail: req?.file?.path,
    });
    res.status(201).json(newCourse);
  } catch (err) {
    next(err);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await courseServices.getAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.session.user;
    const course = await courseServices.getCourseById(id, _id);
    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const courseData = req.body;
    const updatedCourse = await courseServices.updateCourse(id, {
      ...courseData,
      thumbnail: req?.file?.path,
    });
    res.status(200).json(updatedCourse);
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    await courseServices.deleteCourse(id);
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};

exports.createModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    let moduleData = req.body;

    let moduleMedia = {};
    if (moduleData.type === 'video') {
      moduleMedia = { videoUrl: req?.file?.path };
    } else if (moduleData.type === 'notes') {
      moduleMedia = { notesUrl: req?.file?.path };
    } else if (moduleData.type === 'quiz') {
      const quiz = await quizServices.createQuiz({
        ...moduleData.quiz,
      });
      moduleData = { ...moduleData, quiz: quiz._id.toString() };
    }

    const updatedCourse = await courseServices.addModule(id, {
      ...moduleData,
      ...moduleMedia,
    });
    res.status(200).json(updatedCourse);
  } catch (err) {
    next(err);
  }
};

exports.updateModule = async (req, res, next) => {
  try {
    const { id, moduleId } = req.params;
    let moduleData = req.body;

    let moduleMedia = {};
    if (moduleData.type === 'video') {
      moduleMedia = { videoUrl: req?.file?.path };
    } else if (moduleData.type === 'notes') {
      moduleMedia = { notesUrl: req?.file?.path };
    } else if (moduleData.type === 'quiz') {
      const quiz = await quizServices.createQuiz({
        ...moduleData.quiz,
      });
      moduleData = { type: 'quiz', quiz: quiz._id.toString() };
    }

    const updatedCourse = await courseServices.updateModule(id, moduleId, {
      ...moduleData,
      ...moduleMedia,
    });
    res.status(200).json(updatedCourse);
  } catch (err) {
    next(err);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const { id, moduleId } = req.params;
    const updatedCourse = await courseServices.deleteModule(id, moduleId);
    res.status(200).json(updatedCourse);
  } catch (err) {
    next(err);
  }
};

exports.addQuizToModule = async (req, res, next) => {
  try {
    const { id, moduleId } = req.params;
    const quizData = req.body;
    const updatedCourse = await courseServices.addQuizToVideoModule(
      id,
      moduleId,
      quizData
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    next(err);
  }
};

exports.removeQuizFromModule = async (req, res, next) => {
  try {
    const { id, moduleId, quizId } = req.params;
    const updatedCourse = await courseServices.removeQuizFromVideoModule(
      id,
      moduleId,
      quizId
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    next(err);
  }
};

exports.getQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await quizServices.getQuizById(id);
    res.status(200).json(quiz);
  } catch (err) {
    next(err);
  }
};
