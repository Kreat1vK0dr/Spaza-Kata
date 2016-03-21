var group = require('./group_data');
var draw = require('./drawTable');
var f = require('./filter');
var get = require('./get&map_data');
var sms = require('./sms_configure');
var exprt = require('./export');
var salesFolder = './sales';
var purchasesFolder = './purchases';
var productListFolder = "./product-list";

var found = get.quantityPurchasedBy('15-Feb',"Milk 1l");
get.quantityPurchasedBy('15-Feb',"Milk 1l");
// console.log(found);

// console.log(draw.table(draw.dataTable(found)));

// var result = [get.mappedSales()[0][15], get.mappedSales()[1][60], get.mappedSales()[2][5], get.mappedSales()[3][27]];


var result = group.salesByProduct()[0][0];
console.log(result);
