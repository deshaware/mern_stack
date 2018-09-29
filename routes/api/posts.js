//authentication and login stuff
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const validatePostInput = require("../../validation/post");
const Profile = require('../../models/Profile');
// @route   GET api/posts/test
// @desc    test post route
// @access  public
router.get('/test', (req, res) => res.json({
  msg: "Posts works"
}));

// @route   GET api/posts/get
// @desc    get all posts
// @access  public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => {
      res.json(posts)
    })
    .catch(err => res.status(404).json({
      nopostsfound: `No Post found `
    }));
});

// @route   GET api/posts/get
// @desc    get all posts
// @access  public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => res.status(404).json({
      nopostfound: `No Post found with ID ${req.params.id}`
    }));
});


// @route   POST api/posts
// @desc    create a post
// @access  private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  //Validate
  const {
    errors,
    isValid
  } = validatePostInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }
  //Create a new post variable
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar, //React States will take avatar and name from State
    user: req.user.id
  });
  newPost.save().then(post => res.json(post))
});

// @route   DELETE api/posts/delete/id
// @desc    Delete the post
// @access  Private

router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  //Making usree the one who is deleting the post is the owner of the post
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: 'User not authorized'
            });
          }

          //Delete
          post.remove().then(() => res.json({
            success: true
          }));
        })
        .catch(err => res.status(404).json({
          postnotfound: `No post found`
        }));
    }).catch(err => res.status(404).json({
      postnotfound: `No User found`
    }));

});

// @route   POST api/posts/like/id(post id that's been like)
// @desc    Like the post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  //taking the logged in user
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      //taking the post which we are about to like
      Post.findById(req.params.id)
        .then(post => {
          console.log(`found out the post is ${post}`)
          //see if he's already liked the post, we will use filter first
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            res.status(400).json({
              alreadyliked: `User already liked this post`
            });
          }
          //Add user id to like array
          post.likes.unshift({
            user: req.user.id
          });
          post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({
          postnotfound: `No post found`
        }));
    }).catch(err => res.status(404).json({
      postnotfound: `No User found`
    }));

});

// @route   POST api/posts/unlike/id(post id that's been like)
// @desc    Unlike the post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  //taking the logged in user
  console.log("ala")
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      //taking the post which we are about to like
      console.log(`User is ${profile.user} `)
      Post.findById(req.params.id)
        .then(post => {
          console.log(`Post is ${post} `)
          //see if he's already liked the post, we will use filter first
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
              notliked: `You have not yet liked this post`
            });
          }
          //Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice it out of the array
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          postnotfound: `No post found`
        }));
    }).catch(err => res.status(404).json({
      postnotfound: `No User found`
    }));

});

// @route   POST api/posts/comment/:id(post id that's been like)
// @desc    Add comment to post
// @access  Private

router.post('/comment/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  //Validation
  const {
    errors,
    isValid
  } = validatePostInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }
  console.log(`Body is ${req.user.name} `)
  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
      }

      //Add comments to array
      post.comments.unshit(newComment);
      //Save
      post.save().then(res.json(post));
    }).catch(err => res.status(404).json({
      postnotfound: "No Post Found"

    }));
});

module.exports = router;