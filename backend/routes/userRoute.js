const express = require("express");
const { classes, student, creatClass, creatStudent } = require("../controllers/populateController");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/creatClass").post(creatClass);
router.route("/class").get(classes);
router.route("/creatStudent").post (creatStudent);
router.route("/student").get(student);

module.exports = router;
