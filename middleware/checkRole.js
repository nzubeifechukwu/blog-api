function requireAuthor(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  if (req.user.role !== "AUTHOR") {
    return res.status(403).json({
      message: "Forbidden. You must be an author to perform this action.",
    });
  }

  next();
}

module.exports = { requireAuthor };
