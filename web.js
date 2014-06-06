/**
 * Created by Takawo on 14/05/30.
 */
var express = require("express");
var app = express();
app.get("/", function(req, res){
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
	var wb1 = new wbModel({
		"work_book" : "英単語",
		"regist_date" : "2014-06-06",
		"update_date" : "2014-06-06",
		"front_card" : "opportunity",
		"back_card" : "アパ[テュ]ーニティ 良い機会,好機,チャンス"
	});
	wb1.save(function (err) {if (err) console.log ('Error on save!')});

	wbModel.find({}).exec(function(err, docs) {
		if(!err) {
//		console.log("num of item => " + docs.length);
			res.send("HerokuでNodeをテスト！！\r\n+" +
					"結果 => " + docs);
			console.log("結果 => " + docs);
			for (var i = 0; i < docs.length; i++ ) {
				console.log(i);
			}
			console.log("num of item => " + docs.length);
			mongoose.disconnect();  // mongodbへの接続を切断
			process.exit();         // node.js終了
		} else {
			console.log("find error:"+err)
		}
	});

});

