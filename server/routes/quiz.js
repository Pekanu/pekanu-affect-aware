const router = require("express").Router();

const courseController = require("../controllers/course");
const isAuthenticated = require("../middlewares/auth");

router.get("/:id", isAuthenticated, courseController.getQuiz);
module.exports = {
  use: "/quiz",
  router,
};
