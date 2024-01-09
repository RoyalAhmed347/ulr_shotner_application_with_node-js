const { default: mongoose } = require("mongoose");

const url_schema = new mongoose.Schema(
  {
    redrect_url: {
      type: String,
      require: true,
    },
    temp_url: {
      type: String,
    },
    analize_url: {
      type: String,
    },
    short_id: {
      type: String,
      unique: true,
      require: true,
    },
    createdBy: {
      type: String,
      require: true,
    },

    vistHistry: [
      { timestamps: { type: Number }, deviceName: { type: String } },
    ],
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("urls", url_schema);

module.exports = URL;
