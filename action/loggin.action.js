// User/Employee logged in functions

const userLoggedIn = (req, res, user_id) => {
  res.cookie("userLoggedPass", "userSecret");
  res.cookie("user_id", user_id);
  return;
};

const employeeLoggedIn = (req, res, employee_id) => {
  res.cookie("employeeLoggedPass", "employeeSecret");
  res.cookie("employee_id", employee_id);
  return;
};

const userLoggedInCheck = (req, res) => {
  if (req.cookies.userLoggedPass == "userSecret") {
    return true;
  }
  return false;
};

const employeeLoggedInCheck = (req, res) => {
  if (req.cookies.employeeLoggedPass == "employeeSecret") {
    return true;
  }
  return false;
};

module.exports = {
  userLoggedIn,
  employeeLoggedIn,
  userLoggedInCheck,
  employeeLoggedInCheck,
};
