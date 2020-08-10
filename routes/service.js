var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
var beautify = require('json-beautify');
const { route } = require('./site');

router.get('/',function(req,res,next){
    connection.query('select * from services',function(err,services){
        if(err){
            console.log(err);
            res.err(err);
        }else{

            console.log(services);
            res.render('services',{servicesInformation:services})
        }
    })
})

router.post('/insert',function(req,res,next){
    var insertServiceuery = "INSERT INTO `services`(`service_id`, `service_name`, `bandwith`)"+
    "VALUES ('"+req.body.serviceId+"','"+req.body.serviceName+"','"+req.body.bandwith+"')"
    connection.query(insertServiceuery,function(err,result){
        if(err){
            res.send(err)
        }else{
            console.log(result);
            res.redirect('/service')
        }
    })
})

router.post('/delete',function(req,res,next) {
    var deleteQuery = "delete from `service` where `service_id`='"+req.body.serviceId+"'";
    connection.query(deleteQuery,function(err,result) {
        if(err){
            res.send(err)
        }else{
            res.redirect('/service')
        }
    })
})

router.get('/:serviceId',function(req,res,next){
    connection.query("select * from `services`",function(err,servuces){
        if(err){
            res.send(err)
        }else{
            res.render('services',{servicesInformation : services})
        }
    })
})

module.exports = router;