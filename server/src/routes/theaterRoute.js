const express = require("express");
const theaterController = require("../controllers/theaterController");

const router = express.Router();

/**
 * @openapi
 * /theaters/addTheater:
 *   post:
 *     tags:
 *       - Theater
 *     summary: Add a new theater
 *     description: Add a new theater
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: number
 *               email:
 *                 type: string
 *               owner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Theater added successfully
 *       400:
 *         description: Bad request
 */
router.post("/addTheater", theaterController.addTheater);

/**
 * @openapi
 * /theaters/getAllTheaters:
 *   get:
 *     tags:
 *       - Theater
 *     summary: Get all theaters
 *     description: Get all theaters
 *     responses:
 *       200:
 *         description: All theaters fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/getAllTheaters", theaterController.getAllTheaters);

/**
 * @openapi
 * /theaters/getAllTheatersByOwner:
 *   get:
 *     tags:
 *       - Theater
 *     summary: Get all theaters by owner
 *     description: Get all theaters owned by a specific user
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All theaters by owner fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/getAllTheatersByOwner", theaterController.getAllTheatersByOwner);

/**
 * @openapi
 * /theaters/updateTheater:
 *   patch:
 *     tags:
 *       - Theater
 *     summary: Update an existing theater
 *     description: Update an existing theater's details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theaterId:
 *                 type: string
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: number
 *               email:
 *                 type: string
 *               owner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Theater updated successfully
 *       400:
 *         description: Bad request
 */
router.patch("/updateTheater", theaterController.updateTheater);

/**
 * @openapi
 * /theaters/deleteTheater/{theaterId}:
 *   delete:
 *     tags:
 *       - Theater
 *     summary: Delete a theater
 *     description: Delete a theater by its ID
 *     parameters:
 *       - name: theaterId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theater deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete("/deleteTheater/:theaterId", theaterController.deleteTheater);

module.exports = router;
