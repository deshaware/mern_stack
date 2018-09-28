const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//users files
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

var app = express();

//Body Parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// db config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Moongose connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello!"));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));