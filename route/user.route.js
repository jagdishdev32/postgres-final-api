const router = require("express").Router();
const pool = require("../db");

const { userLoggedIn } = require("../action/loggin.action");

//TODO comment / remove user list access
router.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (error, result) => {
    if (error) {
      res.status(500).json({ error: "Server Error" });
      // throw error;
      console.log(error);
    }
    res.status(200).json(result.rows);
  });
});

// Method POST /api/user/register
// Desc   register route api
// auth   public
router.post("/register", (req, res) => {
  const { user_id, name, email, password, phone_number } = req.body;

  //TODO Encrypt Password

  const query = {
    text: "INSERT INTO users (user_id, name, email, password, phone_number) VALUES ($1, $2, $3, $4, $5)",
    values: [user_id, name, email, password, phone_number],
  };

  pool.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: "Error, Invalid Syntax" });
      // throw err;
      console.log(err);
    } else {
      console.log(result);
      res.status(200).json({ message: "User Added Successfully." });
    }
  });
});

// Method POST /api/user/login
// Desc   login route api
// auth   public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // TODO Decrypt password

  // //TODO Prevent SQL Injection from query
  const query = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;

  pool.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: "Error, Invalid Syntax" });
      // throw err;
      console.log(err);
    }

    if (result.rowCount == 1) {
      const user_id = result.rows[0].user_id;
      console.log(user_id);
      userLoggedIn(req, res, user_id);
      res.json({ message: "User Authenticated" });
    } else {
      res.json({ message: "User Not authenticated" });
    }
  });
});

module.exports = router;
