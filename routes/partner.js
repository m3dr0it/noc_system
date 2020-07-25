var express = require('express');
var router = express.Router();
var connection = require('./connection');

router.get('/',function(req,res,next){
    connection.query("select * from partners",function(err,partners){
        console.log(partners);
        res.render('allpartner',{partnerInformation:partners})
    })
})
router.get('/insert',function(req,res,next){
    res.render('formInputPartner')
})

router.post('/:partnerId/add_project',function(req,res,next){
    console.log(req.params.partnerId);
    console.log(req.body.projectId);
    var queryAddProjectToPartner = "INSERT INTO `projects`(`project_id`, `partner_id`) "+
    "VALUES ('"+req.body.projectId+"','"+req.params.partnerId+"')"
    connection.query(queryAddProjectToPartner,function(err,result){
        if(err) res.send(err)
        console.log(result);
        res.redirect('/partner/'+req.params.partnerId+'');
    })
})

router.get('/:partnerId',function(req,res,next){
    connection.query("select count(partner_id) as partnersCount from partners join projects using(`partner_id`) where"+
    "`partner_id`='"+req.params.partnerId+"'",function(err,partners){
        if(err){
            console.log(err);
            res.send(err)
        }else{
            console.log(partners[0].partnersCount);
            if(partners[0].partnersCount > 0 ){
                connection.query("select * from `partners` join projects using(`partner_id`)"+
                "where `partner_id`='"+req.params.partnerId+"' ",function(err,partner){
                    if(err){
                        res.send(err)
                    }else{
                    console.log(partner);
                    res.render('partner',{
                        partnerInformation : partner[0],
                        projectInformation : partner
                    })
                    }
                })
            }else{
            connection.query("select * from `partners` where `partner_id`='"+req.params.partnerId+"'",function(err,partner){
                console.log(partner);
                res.render('partner',{partnerInformation : partner[0]})
                })
            }
        }
    })
})

router.post('/insert',function(req,res,next){
    var queryInsertPartner = "INSERT INTO `partners`(`partner_id`, `partner`) "+
    "VALUES ('"+req.body.partnerId+"','"+req.body.partnerName+"')"
    connection.query(queryInsertPartner,function(err,result){
        if(err) res.send(err);
        console.log(result);
        res.redirect('/partner')
    })
})

router.post('/edit/:partnerId',function(req,res,next){
    console.log(req.body);
    console.log(req.params.partnerId);
    var queryEditPartner = "UPDATE `partners` SET `partner`='"+req.body.partnerName+"' "+
    "WHERE `partner_id`='"+req.params.partnerId+"'";
    connection.query(queryEditPartner,function(err,result){
        if(err) res.send(err);
        console.log(result);
        res.redirect('/partner')
    })
})

router.get('/delete/:partnerId',function(req,res,next){
    var queryDeletePartner = "delete from `partners` where `partner_id`='"+req.params.partnerId+"'";
    connection.query(queryDeletePartner,function(err,result){
        if(err) res.send(err)
        console.log(result);
        console.log(req.params.partnerId+" Deleted");
        res.redirect('/partner')
    })
})

module.exports = router;