const express= require('express');
const router =express.Router();

// @route   GET api/posts/test
// @desc    Test users route
// @access  Public 

router.get('/test', (req,res) => res.json({msg: "user routes"}));

module.exports= router;