//users profile//authentication and login stuff
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//load profile Model
const Profile = require("../../models/Profile");
//Load user profile
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    test profile route
// @access  public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile works"
  })
);
module.exports = router;

//we're not gonna get param:id cuz payload anyway has id in it
// @route   GET api/profile/
// @desc    get user profile
// @access  private

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    //validation, or too create error variable so that an object can be sent as a response
    const errors = {};
    Profile.findOne({
        user: req.user.id
      })

      //getting name and avatar
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.nonprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = `There are not profile`;
        return res.send(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({
        profile: `There is problem with fetching profile`
      })
    );
});

// @route   GET api/profile/handle/:handle (This will be hit by backend, not by the user)
// @desc    Get profile by handle
// @access  public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({
      handle: req.params.handle
    })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.send(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user (This will be hit by backend, not by the user)
// @desc    Get profile by user id
// @access  public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({
      user: req.params.user_id
    })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({
        profile: "There is no profile  "
      })
    );
});

// @route   POST api/profile/
// @desc    create or update user profile
// @access  private

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    //Validate first
    const {
      errors,
      isValid
    } = validateProfileInput(req.body);

    //Check validation
    if (!isValid) {
      res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Skills - Split into array
    if (typeof (req.body.skills != undefined)) {
      //This will give an array as opposed to comma separated values
      profileFields.skills = req.body.skills.split(",");
    }

    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      console.log("Found me");
      if (profile) {
        //The means this is an update
        Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        }).then(profile => res.json(profile));
      } else {
        //create profile
        //check if the handles exists
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          console.log("FOund profile, looking for handle");
          if (profile) {
            errors.handle = "That handles already exists";
            res.status(400).json(errors);
          }

          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    add experience to profile
// @access  private

router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    //Will do validation
    console.log(req.body)
    console.log("Profile 1 is " + req.body.from)
    const {
      errors,
      isValid
    } = validateExperienceInput(req.body);
    console.log("Profile is" + req.body.from)
    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        //Add to experience array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.sendStatus(403).json(err));
  }
);

// @route   POST api/profile/education
// @desc    add education to profile
// @access  private

router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    //Will do validation
    const {
      errors,
      isValid
    } = validateEducationInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        //Add to experience array
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.sendStatus(403).json(err));
  }
);

// @route   DELETE api/profile/experience/exp_id
// @desc    Delete experience from profile
// @access  private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    //Will do validation   
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        //Find the experience that we want to delete
        //Get remove index , thre are few ways, will use map
        console.log("Found one to delete bc")
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out of array
        console.log("Trying to delete " + req.params.id)
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => {
          console.log("removed bhcnod");
          res.json(profile)
        });
        //Add to experience array
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/edu_id
// @desc    Delete education from profile
// @access  private

router.delete('/education/:edu_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    }).then(profile => {
      //take index of education id
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.send(404).json(err))
});


// @route   DELETE api/profile/
// desc     DELETE current user profile which 
// access   private

router.delete('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log("Deletion here")
  console.log("User id is" + req.user.id)
  Profile.findOneAndRemove({
      user: req.user.id
    })
    .then(() => {
      //will delete the user as well
      console.log("Removed profile")
      User.findOneAndRemove({
        _id: req.user.id
      }).then(() => res.json({
        sucess: true
      }))
    })
    .catch(err => res.send(404).json(err));
});
module.exports = router;