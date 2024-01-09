const express = require("express");
const { default: mongoose, Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const USER = model("user", userSchema);

module.exports = USER;
