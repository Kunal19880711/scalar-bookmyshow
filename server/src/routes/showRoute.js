const express = require("express");
const showController = require("../controllers/showController");

const router = express.Router();

/**
 * @openapi
 * /shows/addShow:
 *   post:
 *     tags:
 *       - Show
 *     summary: Add a new show
 *     description: Add a new show
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               movie:
 *                 type: string
 *               theater:
 *                 type: string
 *               ticketPrice:
 *                 type: number
 *               totalSeats:
 *                 type: number
 *     responses:
 *       200:
 *         description: Show added successfully
 *       400:
 *         description: Bad request
 */
router.post("/addShow", showController.addShow);

/**
 * @openapi
 * /shows/updateShow:
 *   patch:
 *     tags:
 *       - Show
 *     summary: Update a show
 *     description: Update a show
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showId:
 *                 type: string
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               movie:
 *                 type: string
 *               theater:
 *                 type: string
 *               ticketPrice:
 *                 type: number
 *               totalSeats:
 *                 type: number
 *     responses:
 *       200:
 *         description: Show updated successfully
 *       404:
 *         description: Show not found
 */
router.patch("/updateShow", showController.updateShow);

/**
 * @openapi
 * /shows/deleteShow/{showId}:
 *   delete:
 *     tags:
 *       - Show
 *     summary: Delete a show
 *     description: Delete a show
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Show deleted successfully
 *       404:
 *         description: Show not found
 */
router.delete("/deleteShow/:showId", showController.deleteShow);

/**
 * @openapi
 * /shows/getAllShowsByTheater:
 *   post:
 *     tags:
 *       - Show
 *     summary: Get all shows by theater
 *     description: Get all shows by theater
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theaterId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shows fetched successfully
 *       400:
 *         description: Bad request
 */
router.post("/getAllShowsByTheater", showController.getAllShowsByTheater);

/**
 * @openapi
 * /shows/getAllTheatersByMovie:
 *   post:
 *     tags:
 *       - Show
 *     summary: Get all theaters by movie
 *     description: Get all theaters by movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Theaters fetched successfully
 *       400:
 *         description: Bad request
 */
router.post("/getAllTheatersByMovie", showController.getAllTheatersByMovie);

/**
 * @openapi
 * /shows/getShowById:
 *   post:
 *     tags:
 *       - Show
 *     summary: Get a show by id
 *     description: Get a show by id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Show fetched successfully
 *       404:
 *         description: Show not found
 */
router.post("/getShowById", showController.getShowById);

module.exports = router;
