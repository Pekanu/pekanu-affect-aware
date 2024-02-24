const logController = require('../controllers/log');
const isAuthenticated = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');

const router = require('express').Router();

router.post('/', isAuthenticated, logController.createLog);
router.get('/download', isAdmin, logController.downloadLogs);

module.exports = {
  use: '/log',
  router,
};
