var express = require("express");
var fs = require('fs');
var csv = require('csv');
const iconv = require('iconv-lite');
var app = express();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/",function(req,res,next){
    res.send("heroku");
})

app.get("/address", function(req, res, next){
    var code = req.query.code;
    fs.createReadStream(__dirname + '/38EHIME.CSV')
    .pipe(iconv.decodeStream('shift_jis'))
    .pipe(csv.parse((error, data) => {
        data.forEach((element, index, array) => {
            if(element[2] == code){
                res.json(element);
                return;
            }
        })
    }));
});