var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
var beautify = require('json-beautify');
const { route } = require('./site');
const { log } = require('debug');

router.get('/',function(req,res,next){
    var showStatusQuery = "select * from `status`";
    connection.query(showStatusQuery,function(err,statusInformation){
        if(err){
            res.send(err)
        }else{
            res.render('status',{statusInformation : statusInformation})
        }
    })
})

router.post('/add',function(req,res,next){
    var addStatusQuery = "insert into `status` (`status_id`,`status`) value ('"+req.body.statusId+"','"+req.body.statusName+"')"
    connection.query(addStatusQuery,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.redirect('/status')
        }
    })
})

router.post('/edit',function(req,res,next){
    console.log(req.body);
    var editStatusQuery = "update `status` set `status`='"+req.body.statusName+"' where `status_id`='"+req.body.statusId+"'";
    connection.query(editStatusQuery,function(err,result){
        if (err) {
            res.send(err)
        }else{
            res.redirect('/status')
        }
    })
})


module.exports = router;