const { Router } = require("express");
const passport = require("passport");

const controllers = require("../controllers/controllers");
const { requireAuthor, optionalAuth } = require("../middleware/auth");

const router = Router();

// Public routes
router.get("/", controllers.home);
router.get("/posts", controllers.getPublishedPosts);
router.get("/posts/:id", optionalAuth, controllers.getPostById); // uses optionalAuth so authors can see their unpublished drafts

// Authentication & Registration
router.post("/user", controllers.createUser);
router.post("/login", controllers.loginUser);

// Protected routes
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }), // Authenticate the user (Verify token & set req.user)
  requireAuthor, // Check if the user has the AUTHOR role
  controllers.createPost,
);
router.patch(
  "/user/role",
  passport.authenticate("jwt", { session: false }),
  controllers.updateRole,
);

module.exports = router;
