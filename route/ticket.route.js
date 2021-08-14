const router = require("express").Router();
const { employeeLoggedInCheck } = require("../action/loggin.action");
const pool = require("../db");

// Method get /api/ticket
// Desc   show all tickets
// auth   private (access by employee only)
router.get("/", (req, res) => {
  console.log(req.cookies);
  if (!employeeLoggedInCheck(req, res)) {
    res.status(404).json({ warning: "Restricted Route" });
    return;
  }

  const query = "SELECT * FROM tickets";
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
    console.log(result.rows);
    res.send(result.rows);
  });
});

// Method PUT /api/ticket
// Desc   Update ticket status
// auth   private (access by employee only)
router.put("/:id", (req, res) => {
  if (!employeeLoggedInCheck(req, res)) {
    res.status(404).json({ warning: "Restricted Route" });
    return;
  }

  const ticket_id = req.params.id;

  //TODO check for Valid ticket id

  const { status } = req.body;

  const query = {
    //TODO Update Values
    text: `UPDATE tickets SET status='${status}' WHERE ticket_id='${ticket_id}'`,
  };
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
    // console.log(result.rows);
    console.log(result);
    res.json({ message: "Ticket Status Updated" });
    // res.send(result.rows);
  });
});

module.exports = router;
