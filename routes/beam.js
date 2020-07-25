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

router.post('/edit/:beamId',function(req,res,next){
    var queryEditBeam = "UPDATE `beams` SET `beam`='"+req.body.beamNumber+"',"+
    "`covered_area`='"+req.body.coveredArea+"' WHERE `beam_id`='"+req.params.beamId+"'";
    connection.query(queryEditBeam,function(err,result){
        if(err) throw err;
        console.log(result);
        res.redirect('/beam')
    })
})

router.get('/:beamId',function(req,res,next){
    connection.query("select * from beams where `beam_id`='"+req.params.beamId+"'",function(err,beam){
        console.log(beam);
        res.render('beam',{beamInformation:beam[0]})
    })
})

router.get('/delete/:beamId',function(req,res,next){
    console.log(req.params.beamId);
    var queryDeteleBeam = "delete from `beams` where `beam_id`='"+req.params.beamId+"'";
    connection.query(queryDeteleBeam,function(err,result){
        if(err){
            console.log(err);
            res.send(err)
        }else{
            console.log(result);
            console.log(req.params.beamId+" has been deleted");
            res.redirect('/beam')
        }
    })
})



module.exports = router;