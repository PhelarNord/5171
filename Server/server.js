const express = require('express');
var app = express();

app.post('/', function(req, res){
    console.log('HI');
    res.send('HELLO YOU');
})