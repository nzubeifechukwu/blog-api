const { Router } = require("express");

const controllers = require("../controllers/controllers");

const router = Router();

router.get("/", controllers.home);

module.exports = router;
