require("dotenv").config();
const express = require("express");
const urlRoute = require("./routers/url");
const staticRouter = require("./routers/staticRouter");
const userRoute = require("./routers/user");
const app = express();
// const ShortUniqueId = require("short-unique-id");
const mongoDBConnection = require("./connection.js");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const {
  restrictToLoginUserOnly,
  cheackAuth,
} = require("./middlewares/auth.js");

// Mongo COnnection
mongoDBConnection(process.env.MONGO).then(() =>
  console.log("Mongo is Connected...")
);
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", "./template/view");

hbs.registerPartials("./template/partials");
const PORT = process.env.PORT || 8001;

// Route
app.use("/url", restrictToLoginUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", cheackAuth, staticRouter);

// Server started
app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});
