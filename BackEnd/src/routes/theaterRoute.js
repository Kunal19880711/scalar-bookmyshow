const express = require("express");
const theaterController = require("../controllers/theaterController");

const router = express.Router();

router.post("/addTheater",  theaterController.addTheater);
router.get("/getAllTheaters",  theaterController.getAllTheaters);
router.get("/getAllTheatersByOwner",  theaterController.getAllTheatersByOwner);
router.patch("/updateTheater",  theaterController.updateTheater);
router.delete("/deleteTheater/:theaterId",  theaterController.deleteTheater);

module.exports = router;
