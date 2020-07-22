var express = require('express');
var router = express.Router();
var connection = require('./connection'); 

router.get('/',function(req,res,next){
    connection.query("select * from partners join projects using(partner_id)",function(err,partners){
        console.log(partners);
        res.render('allpartner',{partnerInformation:partners})
    })
})
router.get('/insert',function(req,res,next){
    res.render('formInputPartner')
})

router.get('/:partnerId',function(req,res,next){
    connection.query("select * from partners where partner_id='"+req.params.partnerId+"' ",function(err,partner){
        res.render('partner',{partnerInformation : partner})
    })
})

router.post('/insert',function(req,res,next){
    res.render('allpartner')
})

module.exports = router;