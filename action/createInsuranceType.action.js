const pool = require("../db");

const createInsuranceType = (req, res, user_id, insurance_type) => {
  // First getting user_id due to one error
  let query = `SELECT insurance_id FROM insurance WHERE user_id='${user_id}'`;

  // Taking insurance_id of user
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }

    // If insurance details not yet updated reject it
    // TODO fix bug for if more then 1 user with same email
    if (result.rows.length < 1) {
      res.json({
        warning: "Please complete Insurance Detail first, then retry",
      });
    }

    const { insurance_id } = result.rows[0];

    query = {
      text: `INSERT INTO ${insurance_type} (insurance_id) VALUES ($1)`,
      //TODO Chanage value according to insurance_type
      values: [insurance_id],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: error });
      }

      return "Insurance type created successfully.";

      // res.json({ message: "Covid_insurance" });
    });
  });
};

module.exports = createInsuranceType;
