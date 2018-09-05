//authentication and login stuff
const express = require('express');
var router = express.Router();

// @route   GET api/users /test
// @desc    test users route
// @access  public
router.get('/test', (req, res) => res.json({
  msg: "Users works"
}));
module.exports = router;

//in order to access pri