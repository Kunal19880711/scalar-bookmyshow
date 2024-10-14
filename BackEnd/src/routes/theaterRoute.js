const express = require("express");
const { validateJWTToken } = require("../middleware/validateJWTToken");
const theaterController = require("../controllers/theaterController");

const router = express.Router();

router.post("/addTheater",  theaterController.addTheater);
router.get("/getAllTheaters",  theaterController.getAllTheaters);
router.get("/getAllTheatersByOwner/:ownerId",  theaterController.getAllTheatersByOwner);
router.get("/getTheater/:theaterId",  theaterController.getTheater);
router.patch("/updateTheater",  theaterController.updateTheater);
router.delete("/deleteTheater/:theaterId",  theaterController.deleteTheater);

module.exports = router;
