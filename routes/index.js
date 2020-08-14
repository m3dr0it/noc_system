var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
const { all } = require('./site');
const { on } = require('./connection');

var sideBar = 
'      <nav class="col-md-2 d-none d-md-block bg-light sidebar">'+
'        <div class="sidebar-sticky">'+
'          <ul class="nav flex-column">'+
'          <li class="nav-item">'+
'            <a class="nav-link active" href="/">'+
'              <span data-feather="home"></span>'+
'              Dashboard <span class="sr-only"></span>'+
'            </a>'+
'          </li>'+
'          <li class="nav-item">'+
'           <a class="nav-link" href="/site/all">'+
'              <span data-feather="map-pin"></span>'+
'              Sites'+
'           </a>'+
'          </li>'+
'          <li class="nav-item">'+
'           <a class="nav-link" href="/beam">'+
'               <span data-feather="target"></span>'+
'           Beams'+
'            </a>'+
'         </li>'+
'          <li class="nav-item">'+
'            <a class="nav-link" href="/partner">'+
'              <span data-feather="users"></span>'+
'              Partners'+
'           </a>'+
'          </li>'+
'          <li class="nav-item">'+
'            <a class="nav-link" href="/service">'+
'               <span data-feather="package"></span>'+
'             Services'+
'            </a>'+
'          </li>'+
'          <li class="nav-item">'+
'            <a class="nav-link" href="/modem">'+
'              <span data-feather="hard-drive"></span>'+
'               Modem Type'+
'            </a>'+
'          </li>'+
'            <li class="nav-item">'+
'            <a class="nav-link" href="/status">'+
'              <span data-feather="power"></span>'+
'              Status'+
'            </a>'+
'         <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">'+
'          <span>Saved reports</span>'+
'          <a class="d-flex align-items-center text-muted" href="#">'+
'            <span data-feather="plus-circle"></span>'+
'          </a>'+
'        </h6>'+                                          
'     </div>'+
'    </nav>'

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
              res.render('index', { 
                navSideBar : sideBar,
                allSitesStatus : allSitesStatus 
              });
            })
          })
        })
      })
    })
  })  
});

module.exports = router;