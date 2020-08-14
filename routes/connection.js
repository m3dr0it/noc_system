var express = require('express');
var mysql = require('mysql');
// var connectionDb = mysql.createConnection({
//   host:'db_noc',
//   port:'3306',
//   user:'noc_alpha',
//   password:'hellonoc',
//   database:'noc_system'
// });
var connectionDb = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'hellonoc',
  database:'noc_system'
});
connectionDb.connect(function(err){
  console.log(err);
})
module.exports = connectionDb;