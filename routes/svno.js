var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
var beautify = require('json-beautify');
const { route } = require('./site');

router.get('/',function(req,res,next){
    var queryShowSvno = "select * from svno"
    connection.query(queryShowSvno,function(err,svno){
         if(err){
             res.send(err)
         }else{
             res.render('svno',{svnoInformation : svno})
         }
    })
})
router.get('/',function(req,res,next){

})

module.exports = router;