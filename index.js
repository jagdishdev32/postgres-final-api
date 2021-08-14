const express = require("express");

const cookieParser = require("cookie-parser");

// Envirnoment Variable from file support
require("dotenv").config();

const app = express();

// Body Parser Support
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to home page!" });
});

// Routes Imports
const userRoute = require("./route/user.route");
const employeeRoute = require("./route/employer.route");
const ticketRoute = require("./route/ticket.route");

// Routes
app.use("/api/user", userRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/ticket", ticketRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("App running at port", PORT);
});
