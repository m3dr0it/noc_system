var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
var beautify = require('json-beautify');
const { route } = require('./site');

router.get("/",function(req,res,next){
    connection.query("select * from beams",function(err,beams){
        console.log(beams);
        res.render("allbeam",{beamInformation : beams})
    })
})

router.get('/insert',function(req,res,next){
    res.render("formInputBeam")
})

router.post('/insert',function(req,res,next){
    var queryInsertBeam = "INSERT INTO `beams`(`beam_id`, `beam`, `covered_area`) VALUES "+
    "('"+req.body.beamNumber+"','"+req.body.beamNumber+"','"+req.body.coveredArea+"')";
    connection.query(queryInsertBeam,function(err,result){
        console.log(result);
        res.redirect('/beam');
    })
})

router.get('/:beamId',function(req,res,next){
    connection.query("select * from beams where `beam_id`='"+req.params.beamId+"'",function(err,beam){
        console.log(beam);
        res.render('beam',{beamInformation:beam[0]})
    })
})

module.exports = router;