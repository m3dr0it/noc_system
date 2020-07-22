var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
const { all } = require('./site');
const { on } = require('./connection');

/* GET home page. */
router.get('/',function(req, res, next) {
  var allSitesStatus = {
    totalSitesCount : '',
    offlineSitesCount : '',
    onlineSitesCount : '',
    notActivatedSitesCount : '',
    partnersCount :'',
    beamsCount : ''
  }

  connection.query("select count(link_id) as totalSitesCount from sites",function(err,totalSitesCount){
    connection.query("select count(link_id) as offlineSitesCount from sites  where `status_id`='1'",function(err,offlineSitesCount){
      connection.query("select count(link_id) as onlineSitesCount from sites  where `status_id`='2'",function(err,onlineSitesCount){
        connection.query("select count(link_id) as notActivatedSitesCount from sites where `status_id`='4'",function(err,notActivatedSitesCount){
          connection.query("select count(beam_id) as beamsCount from beams",function(err,beamsCount){
            connection.query("select count(partner) as partnersCount from partners",function(err,partnersCount){

              allSitesStatus.partnersCount = partnersCount[0].partnersCount;
              allSitesStatus.offlineSitesCount = offlineSitesCount[0].offlineSitesCount;
              allSitesStatus.onlineSitesCount = onlineSitesCount[0].onlineSitesCount;
              allSitesStatus.notActivatedSitesCount = notActivatedSitesCount[0].notActivatedSitesCount;
              allSitesStatus.totalSitesCount = totalSitesCount[0].totalSitesCount;
              allSitesStatus.beamsCount = beamsCount[0].beamsCount;
              
              console.log(allSitesStatus);
              res.render('index', { allSitesStatus : allSitesStatus });
            })
          })
        })
      })
    })
  })  
});

module.exports = router;