const { Router } = require("express");
const router = Router();
const tasksRoute = require("./tasks.route");

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Service healthy"
    });
});

router.use("/tasks", tasksRoute);

module.exports = router;
