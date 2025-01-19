const express = require("express");
const router = express.Router();
const AIController = require("../controllers/task.controllers"); 




router.post("/prioritize", AIController.prioritizeTasks);



router.get("/tips", AIController.fetchMotivationalTip);


module.exports = router;
