//authentication and login stuff
const express = require('express');
var router = express.Router();

// @route   GET api/posts/test
// @desc    test post route
// @access  public
router.get('/test', (req, res) => res.json({
  msg: "Posts works"
}));
module.exports = router;