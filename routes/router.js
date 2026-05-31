const { Router } = require("express");

const controllers = require("../controllers/controllers");

const router = Router();

router.get("/", controllers.home);
router.post("/user", controllers.createUser);
router.post("/login", controllers.loginUser);

module.exports = router;
