let userController = require("../controller/user.controller");

let express = require("express");

let router = express.Router();

router.post("/login", userController.loginUser);

router.post("/signUp", userController.signUpUser);

router.get("/getUsers", userController.getAllUsers);

module.exports = router;
