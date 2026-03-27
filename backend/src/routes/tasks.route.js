

const { Router } = require("express");
const router = Router();
const taskController = require("../controller/tasks.contoller");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", asyncHandler(taskController.getAllTasks));
router.post("/", asyncHandler(taskController.createTask));
router.patch("/:id", asyncHandler(taskController.updateTask));
router.delete("/:id", asyncHandler(taskController.deleteTask));

module.exports = router;