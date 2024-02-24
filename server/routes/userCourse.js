const isAuthenticated = require('../middlewares/auth');
const userCourseController = require('../controllers/userCourse');

const router = require('express').Router();

router.post('/:id', isAuthenticated, userCourseController.registerCourse);
router.get('/:id', isAuthenticated, userCourseController.getCourseProgress);
router.get('/', isAuthenticated, userCourseController.getAllCoursesProgress);
router.post(
  '/:id/progress',
  isAuthenticated,
  userCourseController.updateCourseProgress
);
router.post(
  '/:id/complete',
  isAuthenticated,
  userCourseController.completeCourse
);
router.post(
  '/:id/recent',
  isAuthenticated,
  userCourseController.updateRecentModule
);

module.exports = {
  use: '/user/course',
  router: router,
};
