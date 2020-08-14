var express = require('express');
var router = express.Router();
var connection = require('./connection'); 
var beautify = require('json-beautify');

var formInformation = {
  beams : '',
  services : '',
  svno : '',
  modem : '',
  project : '',
  partner : '',
  status : ''
}

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query("select * from sites",function(err,rows){
    console.log(rows);
  })
  res.send("it works");
});

router.get('/all',function(req,res,next){
        connection.query("select * from sites join status using(`status_id`) join services using(`service_id`) join modem using(`modem_id`)",function(err,rows){
            res.render('allsite',{allSiteInformation:rows})
        })
})

router.get('/delete/:linkId',function(req,res,next){
  connection.query("delete from sites where `link_id`='"+req.params.linkId+"'",function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.render('allsite')
    }
  })
})

router.get('/add',function(req,res,next){

  connection.query("select * from beams",function(err,beams){
    connection.query("select * from services",function(err,services){
      connection.query("select * from svno",function(err,svno){
        connection.query("select * from modem",function(err,modem){
          connection.query("select * from projects",function(err,project){
            connection.query("select * from partners",function(err,partner){
              connection.query("select * from status",function(err,status){
                
                formInformation.beams = beams
                formInformation.services = services
                formInformation.svno = svno
                formInformation.modem = modem
                formInformation.partner = partner
                formInformation.status = status
                formInformation.project = project

                console.log(formInformation);
                res.render('formInputSite',{formInformation : formInformation})
              })
            })
          })
        })
      })
    })
  })
})

router.post('/add',function(req,res,next){  
  var insertQuery = "INSERT INTO `sites`(`link_id`, `site_name`, `beam_id`, `service_id`, `svno_id`, `modem_id`, `serial_number`, `mac_air`, "
  +"`longitude`, `latitude`, `status_id`, `start_online`, `project_id`, `terminal_name`, `link_portal`) "
  +"VALUES ('"+req.body.linkId+"','"+req.body.siteName+"','"+req.body.beam+"','"+req.body.service+"','"+req.body.svno+"',"
  +"'"+req.body.modem+"','"+req.body.serialNumber+"','"+req.body.macAir+"','"+req.body.longitude+"','"+req.body.latitude+"',"
  +"'"+req.body.status+"','"+req.body.startOnline+"','"+req.body.projectId+"','"+req.body.terminalName+"','"+req.body.linkToPortal+"')"

  console.log(insertQuery);
  connection.query(insertQuery,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
  })
  res.render('allsite')
})

router.post("/edit/:linkId",function(req,res,next){
  var queryEdit = "UPDATE `sites` SET `link_id`='"+req.body.linkId+"',`site_name`='"+req.body.siteName+"',`beam_id`='"+req.body.beam+"',"+
  "`service_id`='"+req.body.service+"',`svno_id`='"+req.body.svno+"',`modem_id`='"+req.body.modem+"',`serial_number`='"+req.body.serialNumber+"',"+
  "`mac_air`='"+req.body.macAir+"',`longitude`='"+req.body.longitude+"',`latitude`='"+req.body.latitude+"',`status_id`='"+req.body.status+"',"+
  "`start_online`='"+req.body.startOnline+"',`project_id`='"+req.body.projectId+"',`terminal_name`='"+req.body.terminalName+"',"+
  "`link_portal`='"+req.body.linkToPortal+"' WHERE `link_id`='"+req.params.linkId+"' "

  connection.query(queryEdit,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
    res.redirect('/site/'+req.body.linkId+'')
  })
})

router.get('/:linkID',function(req,res,next){
    var linkID = req.params.linkID;
    console.log(linkID);
    connection.query("select * from sites where `link_id`='"+linkID+"' ",function(err,rows){
      connection.query("select * from beams",function(err,beams){
        connection.query("select * from services",function(err,services){
          connection.query("select * from svno",function(err,svno){
            connection.query("select * from modem",function(err,modem){
              connection.query("select * from projects",function(err,project){
                connection.query("select * from partners",function(err,partner){
                  connection.query("select * from status",function(err,status){
                    
                    formInformation.beams = beams
                    formInformation.services = services
                    formInformation.svno = svno
                    formInformation.modem = modem
                    formInformation.partner = partner
                    formInformation.status = status
                    formInformation.project = project
    
                    console.log(rows[0]);
                    res.render('site',{
                      formInformation : formInformation,
                      siteInformation : rows[0]
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })

  router.post('/input',function(req,res,next){
     
  })

  router.get('/export',)


module.exports = router;
