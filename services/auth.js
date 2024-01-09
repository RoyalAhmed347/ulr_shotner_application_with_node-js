const jwt = require("jsonwebtoken");

const setToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY);
};
const getToken = (token) => {
  if (!token) {
    return null;
  }
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { setToken,getToken };
