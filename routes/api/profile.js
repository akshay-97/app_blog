const express= require('express');
const router =express.Router();

// @route   GET api/posts/test
// @desc    Test profile route
// @access  Public 

router.get('/test', (req,res) => res.json({msg: "profile routes"}));

module.exports= router;