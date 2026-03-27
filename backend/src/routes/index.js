const { Router } = require("express");
const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Service healthy"
    });
});


module.exports = router;
