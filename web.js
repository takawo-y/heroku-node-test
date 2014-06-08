/**
 * Created by Takawo on 14/05/30.
 */
var express = require("express");
var app = express();
app.get("/", function(req, res){
	res.send("NodeでTest");
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
 console.log("Listening on " + port);
});

//DB接続
var mongoose = require("mongoose");
var uriString = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	"mongodb://localhost/test";

var wbSchema = new mongoose.Schema({
 "work_book_name" : String,
 "regist_date" : String,
 "update_date" : String,
 "front_card" : String,
 "back_card" : String,
 "results" : [
	{
	 "date" : String,
	 "result" : Boolean
	}
 ]
});
mongoose.connect(uriString, function (err, res) {
 if (err) {
	console.log ('ERROR connecting to: ' + uriString + '. ' + err);
 } else {
	console.log ('Succeeded connected to: ' + uriString);
 }
});
var wbModel = mongoose.model("word_book", wbSchema);

wbModel.find({}).exec(function(err, docs) {
 if(!err) {
	console.log("num of item => " + docs.length);
	for (var i = 0; i < docs.length; i++ ) {
	 console.log(i+"件目＝"+docs[i]);
	}
	mongoose.disconnect();  // mongodbへの接続を切断
//	 process.exit();         // node.js終了
 } else {
	console.log("find error:"+err)
 }
});

