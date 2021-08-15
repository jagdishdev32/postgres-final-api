const router = require("express").Router();
const pool = require("../db");

const {
  employeeLoggedIn,
  employeeLoggedInCheck,
} = require("../action/loggin.action");

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

    // If Employee with name and password existed
    // if employee name and password exists more than 0
    if (result.rowCount > 0) {
      const employee_id = result.rows[0].employee_id;

      employeeLoggedIn(req, res, employee_id);

      res.json({ message: "employee Authenticated" });
    } else {
      res.json({ message: "employee Not authenticated" });
    }
  });
});

// Method POST /api/employee/policyNoUpdate/:user_id
// Desc   Update policyNo and date's
// auth   private (access only by employee)
router.post("/policyNoUpdate/:user_id", (req, res) => {
  if (!employeeLoggedInCheck(req, res)) {
    res.status(404).json({ warning: "Restricted Route" });
    return;
  }

  const { user_id } = req.params;

  const { issue_date, end_date, policy_number } = req.body;

  // Update issue_date, end_date in insurance

  // Taking insurance_id of user
  let message = "";
  let query = `SELECT insurance_id, insurance_type FROM insurance WHERE user_id=${user_id}`;
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }

    // If insurance details not yet updated reject it
    if (result.rows.length < 1) {
      res.json({
        warning: "Please complete Insurance Detail first, then retry",
      });
    }

    const { insurance_id, insurance_type } = result.rows[0];

    query = {
      text: `UPDATE insurance SET issue_date='${issue_date}', end_date='${end_date}' WHERE insurance_id='${insurance_id}'`,
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: error });
      }
      message += "Updated Issue_date & end_date. ";

      // Update policy_number in insurance_type
      query = {
        text: `UPDATE ${insurance_type} SET policy_number='${policy_number}' WHERE insurance_id='${insurance_id}'`,
      };

      pool.query(query, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error: error });
        }
        message += "Updated Issue_date & end_date. ";

        res.json({
          message: message + "Also Updated insurance type policy number!.",
        });
      });
    });
  });
});

module.exports = router;
