var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
var beautify = require('json-beautify');
const { route } = require('./site');

router.get("/",function(req,res,next){
    res.render("beams")
})

module.exports = router;