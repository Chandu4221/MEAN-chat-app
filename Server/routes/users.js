const express = require("express");
const router = express.Router();
const {
    create,
    loginUser,
  } = require("../controller/userController");


router.post("/register", create);
router.post("/login", loginUser);

module.exports = router;
