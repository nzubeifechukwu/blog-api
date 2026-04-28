const prisma = require("../lib/prisma");

function home(req, res) {
  return res.status(200).json({
    message: "Welcome to Nzube's Blog API",
    version: "1.0.0",
    docs: "tbd",
    endpoints: { users: "/users", posts: "/posts", comments: "/comments" },
  });
}

module.exports = { home };
