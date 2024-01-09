const mongoose = require("mongoose");

const mongoDBConnection = (url) => {
  return mongoose.connect(url);
};

module.exports = mongoDBConnection;
