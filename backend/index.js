const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./bd/db");
require("dotenv").config();

const User = require("./routes/user");
const Role = require('./routes/role');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user/", User);
app.use("/api/role/", Role);

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

dbConnection();