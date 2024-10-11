const router = require("express").Router();
const userModel = require("../models/userSchema");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const authorization = require("../middleware/authorizationMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getCurrentUser", authorization, currentUser);

module.exports = router;