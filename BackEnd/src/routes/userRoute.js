const router = require("express").Router();
const userModel = require("../models/userSchema");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateJWTToken = require("../middleware/validateJWTToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getCurrentUser", validateJWTToken, currentUser);

module.exports = router;