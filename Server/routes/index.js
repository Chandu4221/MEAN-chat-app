const express = require("express");
const router = express.Router();
const usersRouter = require("./users");

// const { checkAcceptContentType } = require("../middlewares/acceptContentType");
router.use("/users",usersRouter);
module.exports = router;
