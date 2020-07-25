var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var sideBar = ' <div class="container-fluid">'+
  ' <div class="row">'+
  '      <nav class="col-md-2 d-none d-md-block bg-light sidebar">'+
  '        <div class="sidebar-sticky">'+
  '          <ul class="nav flex-column">'+
  '          <li class="nav-item">'+
  '            <a class="nav-link" href="/">'+
  '              <span data-feather="home"></span>'+
  '              Dashboard <span class="sr-only"></span>'+
  '            </a>'+
  '          </li>'+
  '          <li class="nav-item">'+
  '           <a class="nav-link" href="/site/all">'+
  '              <span data-feather="octagon"></span>'+
  '              Sites'+
  '           </a>'+
  '          </li>'+
  '          <li class="nav-item">'+
  '           <a class="nav-link active" href="/beam">'+
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
  '               <span data-feather="users"></span>'+
  '             Services'+
  '            </a>'+
  '          </li>'+
  '          <li class="nav-item">'+
  '            <a class="nav-link" href="/modem">'+
  '              <span data-feather="users"></span>'+
  '               Modem Type'+
  '            </a>'+
  '          </li>'+              
  '        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">'+
  '          <span>Saved reports</span>'+
  '          <a class="d-flex align-items-center text-muted" href="#">'+
  '            <span data-feather="plus-circle"></span>'+
  '          </a>'+
  '        </h6>'+                                          
  '     </div>'+
  '    </nav>'

  res.render('layout',{body:tes});
});

module.exports = router;
