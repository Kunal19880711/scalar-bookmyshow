const router = require("express").Router();
const userModel = require("../models/userSchema");
const { registerUser, loginUser, currentUser, forgotPassword, resetPassword } = require("../controllers/userController");
const validateJWTToken = require("../middleware/validateJWTToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getCurrentUser", validateJWTToken, currentUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;