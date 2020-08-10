var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
var beautify = require('json-beautify');
const { route } = require('./site');

router.get('/',function(req,res,next){
    connection.query("select * from modem",function(err,modem){
        if(err){
            res.send(err)
        }else{
            res.render('modem',{modemInformation : modem})
        }
    })
})

router.post('/edit',function(req,res,next){
    var queryEditModem = "UPDATE `modem` SET "+
    "`modem_id`='"+req.body.modemId+"',`modem_type`='"+req.body.modemType+"' "+
    " WHERE `modem_id`='"+req.body.modemId+"'";

    connection.query(queryEditModem,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.redirect('/modem')
        }
    })
})

router.get('/delete/:modemId',function(req,res,next){
    var queryDeleteModem = "delete from `modem` where `modem_id`='"+req.params.modemId+"'"
    connection.query(queryDeleteModem,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.redirect('/modem')
        }
    })
})

router.post('/add',function(req,res,next){
    var queryAddModem = "INSERT INTO `modem`(`modem_id`, `modem_type`)"+
    " VALUES ('"+req.body.modemId+"','"+req.body.modemType+"')"
    connection.query(queryAddModem,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.redirect('/modem')
        }
    })
})

module.exports = router;