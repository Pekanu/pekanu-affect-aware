const UserCourseService = require('../services/userCourse');

const userCourseService = new UserCourseService();

exports.registerCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.session;

    const courseRegistration = await userCourseService.createUserCourse(
      id,
      user._id.toString()
    );

    res.status(201).json({
      message: 'Course registered successfully',
      data: courseRegistration,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCourseProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.session;

    const courseProgress = await userCourseService.getCourseProgress(
      id,
      user._id.toString()
    );

    res.status(200).json(courseProgress);
  } catch (err) {
    next(err);
  }
};

exports.getAllCoursesProgress = async (req, res, next) => {
  try {
    const { user } = req.session;

    const coursesProgress = await userCourseService.getAllCoursesProgress(
      user._id.toString()
    );

    res.status(200).json(coursesProgress);
  } catch (err) {
    next(err);
  }
};

exports.updateCourseProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.session;

    const updatedUserCourse = await userCourseService.addProgress(
      id,
      user._id.toString(),
      req.body
    );

    res.status(200).json({
      message: 'Course progress updated successfully',
      data: updatedUserCourse,
    });
  } catch (err) {
    next(err);
  }
};

exports.completeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.session;

    const updatedUserCourse = await userCourseService.userCourseCompleted(
      id,
      user._id.toString()
    );

    res.status(200).json(updatedUserCourse);
  } catch (err) {
    next(err);
  }
};

exports.updateRecentModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.session;
    const { moduleId } = req.body;

    const updatedUserCourse = await userCourseService.updateRecentModule(
      id,
      user._id.toString(),
      moduleId
    );

    res.status(200).json(updatedUserCourse);
  } catch (err) {
    next(err);
  }
};
