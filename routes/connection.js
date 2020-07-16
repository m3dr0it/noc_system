var express = require('express');
var mysql = require('mysql');
var connectionDb = mysql.createConnection({
  host:'localhost',
  user:'noc_alpha',
  password:'P@55w0rd312',
  database:'noc_system'
});
module.exports = connectionDb;