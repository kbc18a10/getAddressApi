var express = require("express");
var fs = require('fs');
var csv = require('csv');
const iconv = require('iconv-lite');
var app = express();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

var addresscode = ''

const parser = csv.parse((error, data) => {
    data.forEach((element, index, array) => {
        if(element[2] == addresscode){
            var target = element;
            console.log(target);
            return;
        }
    })
})


app.get("/address", function(req, res, next){
    addresscode = req.query.code;
    fs.createReadStream(__dirname + '/38EHIME.CSV')
    .pipe(iconv.decodeStream('shift_jis'))
    .pipe(parser);
    //console.log(parser.target);
    //res.json(parser.target)

});