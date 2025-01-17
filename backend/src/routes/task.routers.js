const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const taskController = require("../controllers/task.controllers");

router.use(authMiddleware); 

router.get("/", taskController.getTask); 
router.post("/", taskController.createTask); 
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask); 

module.exports = router;
