const express = require("express");
const showController = require("../controllers/showController");

const router = express.Router();

router.post("/addShow", showController.addShow);
router.patch("/updateShow", showController.updateShow);
router.delete("/deleteShow/:showId", showController.deleteShow);
router.post("/getAllShowsByTheater", showController.getAllShowsByTheater);
router.post("/getAllTheatersByMovie", showController.getAllTheatersByMovie);
router.post("/getShowById", showController.getShowById);

module.exports = router;
