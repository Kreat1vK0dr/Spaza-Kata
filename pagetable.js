var group = require('./group_data');
var nelisa = require('./whatNelisaWants');
var nelisa2 = require('./whatNelisaWants_other');
var get = require('./get&map_data');//
var sms = require('./sms_configure');
var exprt = require('./export');
var fs = require('fs');
var _ = require('lodash');
var draw = require('./drawTable');
var f = require('./filter');
var path = require('./filepaths');
var handlebars = require('handlebars')
// var $ = require('jquery');



var data = nelisa2.whatSheWants()[0];
data.title = "What Nelisa Wants";

var source = fs.readFileSync('./templates/spaza.handlebars', 'utf8');//read spaza.html from disk using fs module;

var template = handlebars.compile(source);

fs.writeFile("./spaza.html", template(data));

// $('table').append(template(data));
