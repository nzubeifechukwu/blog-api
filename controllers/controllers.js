require("dotenv").config();
const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const hashedPassword = await bcrypt.hash(password, 10);

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
      .json({ message: "User registered successfully.", user });
  } catch (error) {
    next(error); // Pass to error handler
  }
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      `${process.env.SECRET}`,
      { expiresIn: "1h" },
    );

    // Don't send the password in the response
    const { password: _, ...loggedInUser } = user;
    return res
      .status(200)
      .json({ message: "Login successful.", token, user: loggedInUser });
  } catch (error) {
    next(error);
  }
}

module.exports = { home, createUser, loginUser };
