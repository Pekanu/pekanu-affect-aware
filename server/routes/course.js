const router = require('express').Router();

const courseController = require('../controllers/course');
const isAdmin = require('../middlewares/admin');
const isAuthenticated = require('../middlewares/auth');
const { thumbnail, moduleUpload } = require('../middlewares/upload');

router.post('/', isAdmin, thumbnail(), courseController.createCourse);
router.get('/', isAuthenticated, courseController.getCourses);
router.get('/:id', isAuthenticated, courseController.getCourse);
router.put('/:id', isAdmin, thumbnail(), courseController.updateCourse);
router.delete('/:id', isAdmin, courseController.deleteCourse);
router.post(
  '/:id/module',
  isAdmin,
  moduleUpload(),
  courseController.createModule
);
router.put(
  '/:id/module/:moduleId',
  isAdmin,
  moduleUpload(),
  courseController.updateModule
);
router.delete('/:id/module/:moduleId', isAdmin, courseController.deleteModule);
router.post(
  '/:id/module/:moduleId/quiz',
  isAdmin,
  courseController.addQuizToModule
);
router.delete(
  '/:id/module/:moduleId/quiz/:quizId',
  isAdmin,
  courseController.removeQuizFromModule
);

module.exports = {
  use: '/course',
  router,
};
