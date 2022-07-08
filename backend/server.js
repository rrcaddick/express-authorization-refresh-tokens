const path = require("path");
const dotenv = require("dotenv").config();
const colors = require("colors");
const express = require("express");
const cors = require("cors");
const { corsOptions } = require("./config/corsConfig");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDb = require("./config/db");
const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goal.routes"));
app.use("/api/users", require("./routes/user.routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "index.html"));
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
