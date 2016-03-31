var express = require('express');
var exphbs  = require('express-handlebars');
var display = require('./js/displayHTML.js');
var path = require('path');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  res.redirect("/home");
});

app.get('/home', function(req,res) {
  res.render("home.handlebars");
});

app.get('/sales/:item_type/:week', function (req, res) {
  var type = req.params.item_type;
  var week = req.params.week;
  var data = display.getData(type, week);
  var template = display.getTmplName(type);
    res.render(template, data);
});

app.listen(3000);
