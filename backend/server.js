const express = require("express");
const dotenv = require("dotenv");

const app = express();

app.listen(5000, () => {
  console.log(`Server started on port ${process.env.port}`);
});
