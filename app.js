const express = require("express");

const prisma = require("./lib/prisma");
const router = require("./routes/router");

const app = express();
const PORT = 10000; // Render uses port 10000

app.use("/", router);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}`);
});
