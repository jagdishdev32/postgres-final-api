// User/Employee logged in functions

const userLoggedIn = (req, res, user_id) => {
  res.cookie("userLoggedPass", "userSecret", { maxAge: 50 * 60 * 60 });
  res.cookie("user_id", user_id);
  return;
};

const employeeLoggedIn = (req, res, employee_id) => {
  res.cookie("employeeLoggedPass", "employeeSecret", { maxAge: 50 * 60 * 60 });
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
  if (req.cookies.userLoggedPass == "employeeSecret") {
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
