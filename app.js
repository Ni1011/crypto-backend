const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
// const { readdirSync } = require("fs");
const app = express();
const userRoute = require("./routes/userRoutes");
const incomeRoute = require("./routes/incomeRoutes");
const expenseRoute = require("./routes/expenseRoutes");

require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello Amu");
});

app.use("/", router);

app.use("/api/users", userRoute);
app.use("/api/income", incomeRoute);
app.use("/api/expense", expenseRoute);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
