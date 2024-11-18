const router = require("express").Router();
const userModel = require("../models/userSchema");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const validateJWTToken = require("../middleware/validateJWTToken");

/**
 * @openapi
 * /users/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Bad request
 */
router.post("/register", registerUser);

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 */
router.post("/login", loginUser);

/**
 * @openapi
 * /users/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Logout a user
 *     description: Logout a user
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       400:
 *         description: Bad request
 */
router.post("/logout", logoutUser);

/**
 * @openapi
 * /users/getCurrentUser:
 *   get:
 *     tags:
 *       - User
 *     summary: Get the current user
 *     description: Get the current user
 *     responses:
 *       200:
 *         description: Current user
 *       400:
 *         description: Bad request
 */
router.get("/getCurrentUser", validateJWTToken, currentUser);

/**
 * @openapi
 * /users/forgotPassword:
 *   post:
 *     tags:
 *       - User
 *     summary: Forgot password
 *     description: Forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Bad request
 */
router.post("/forgotPassword", forgotPassword);

/**
 * @openapi
 * /users/resetPassword:
 *   post:
 *     tags:
 *       - User
 *     summary: Reset password
 *     description: Reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 */
router.post("/resetPassword", resetPassword);

module.exports = router;
