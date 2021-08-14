const router = require("express").Router();
const pool = require("../db");

//TODO comment / remove employee list access
router.get("/", (req, res) => {
  pool.query("SELECT * FROM employees", (error, result) => {
    if (error) {
      res.status(500).json({ error: "Server Error" });
      // throw error;
      console.log(error);
    }
    console.log(result.rows);
    res.status(200).json(result.rows);
  });
});

//TODO comment / remove employee list access
// Method POST /api/employee/register
// Desc   register route api
// auth   public
router.post("/register", (req, res) => {
  const { employee_id, name, password } = req.body;

  //TODO Encrypt Password

  const query = {
    text: "INSERT INTO employees (employee_id, name,  password) VALUES ($1, $2, $3)",
    values: [employee_id, name, password],
  };

  pool.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: "Error, Invalid Syntax" });
      // throw err;
      console.log(err);
    } else {
      console.log(result);
      res.status(200).json({ message: "Employee Added Successfully." });
    }
  });
});

// Method POST /api/employee/login
// Desc   login route api
// auth   public
router.post("/login", (req, res) => {
  const { name, password } = req.body;

  // TODO check name.lower().trim()

  // TODO Decrypt password

  // //TODO Prevent SQL Injection from query
  const query = `SELECT * FROM employees WHERE name='${name}' AND password='${password}'`;

  pool.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: "Error, Invalid Syntax" });
      // throw err;
      console.log(err);
    }

    if (result.rowCount == 1) {
      // console.log(result.rowCount);
      res.json({ message: "employee Authenticated" });
    } else {
      res.json({ message: "employee Not authenticated" });
    }
  });
});

module.exports = router;
