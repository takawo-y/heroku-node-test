/**
 * Created by Takawo on 14/05/30.
 */
var express = require("express");
var app = express();

app.get("/", function(req, res){
 	res.send("HerokuでNodeをテスト！！");
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
 console.log("Listening on " + port);
});