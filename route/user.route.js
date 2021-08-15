const router = require("express").Router();
const pool = require("../db");

const { userLoggedIn, userLoggedInCheck } = require("../action/loggin.action");

const createInsuranceType = require("../action/createInsuranceType.action");

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

// Method POST /api/user/addInsuranceDetails
// Desc   Adding Insurance details by user
// auth   private (access by user only)
router.post("/addInsuranceDetails", (req, res) => {
  if (!userLoggedInCheck(req, res)) {
    res.status(404).json({ warning: "User is not logged in" });
    return;
  }

  const { insurance_type } = req.body;

  //TODO NOT GOOD PRATICE TO TAKE USER ID FROM USER SIDE
  const { user_id } = req.cookies;

  //TODO Check if values already update and then return null;

  const query = {
    text: "INSERT INTO insurance (insurance_type, user_id) VALUES ($1, $2)",
    values: [insurance_type, user_id],
  };

  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }

    createInsuranceType(req, res, user_id, insurance_type);

    console.log(result);
    res.json({
      message:
        "Insurance Details Updated & Insurance Type Created Succesfully.",
    });
  });
});

// Method POST /api/user/generateTicket
// Desc   generating ticket after insurance detail
// auth   private (access by user only)
router.post("/generateTicket", (req, res) => {
  if (!userLoggedInCheck(req, res)) {
    res.status(404).json({ warning: "User is not logged in" });
    return;
  }

  //TODO Check if ticket not already generated

  //TODO NOT GOOD PRATICE TO TAKE USER ID FROM USER SIDE
  const { user_id } = req.cookies;

  const { ticket_id, comments } = req.body;

  let query = `SELECT insurance_id FROM insurance WHERE user_id=${user_id}`;

  // Taking insurance_id of user
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

    const { insurance_id } = result.rows[0];

    query = {
      text: "INSERT INTO tickets (ticket_id, insurance_id, comments) VALUES ($1, $2, $3)",
      values: [ticket_id, insurance_id, comments],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: error });
      }

      res.json({ message: "Ticket generated successfully..." });
    });
  });
});

module.exports = router;
