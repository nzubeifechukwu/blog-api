const prisma = require("../lib/prisma");
const bcryptjs = require("bcryptjs");

function home(req, res) {
  return res.status(200).json({
    message: "Welcome to Nzube's Blog API",
    version: "1.0.0",
    docs: "tbd",
    endpoints: { user: "/user", posts: "/posts", comments: "/comments" },
  });
}

async function createUser(req, res, next) {
  const { email, name, password, role } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role || "READER", // defaults to READER if not provided
      },
    });

    // Don't send the password back in the response
    const { password: _, ...user } = newUser;

    return res
      .status(201)
      .json({ message: "User registered successfully.", user: user });
  } catch (error) {
    next(error) // Pass to your Express error handler
  }
}

module.exports = { home, createUser };
