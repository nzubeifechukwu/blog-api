const { Router } = require("express");

const controllers = require("../controllers/controllers");
const { requireAuthor } = require("../middleware/checkRole");

const router = Router();

router.get("/", controllers.home);
router.post("/user", controllers.createUser);
router.post("/login", controllers.loginUser);
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }), // Authenticate the user (Verify token & set req.user)
  requireAuthor, // Check if the user has the AUTHOR role
  controllers.createPost,
);

module.exports = router;
