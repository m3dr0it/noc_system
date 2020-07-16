var express = require('express');
var mysql = require('mysql');
var connectionDb = mysql.createConnection({
  host:'localhost',
  user:'noc_alpha',
  password:'hellonoc',
  database:'noc_system'
});
module.exports = connectionDb;