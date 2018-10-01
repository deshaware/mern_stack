//authentication and login stuff
const express = require("express");
var router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load user model
const User = require("../../models/User");

// @route   GET api/users /test
// @desc    test users route
// @access  public
router.get("/test", (req, res) =>
  res.json({
    msg: "Users works"
  })
);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  //will validate
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log("received valid request for adding user");
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "Email Already exists";
      return res.status(400).json({
        email: "Email already exist"
      });
    } else {
      console.log("User not found");
      var avatar = gravatar.url(req.body.email, {
        s: "200", //size is 200
        r: "pg", // Rating
        d: "mm" //default is mm
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
              console.log("User created");
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    GET api/users/login
//desc      Login user / Returning JWT Token
//access    Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //validation

  //find user by email
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //check for password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        //create payload which is required for JWT
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; // create jwt payload

        //Sign the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
        // res.json({
        //   msg: "Success"
        // });
        //
      } else {
        errors.password = "Incorrect Password";
        console.log("incorrect password");
        res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  private

router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // res.json({
    //   message: 'Success'
    // })
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
