var group = require('./group_data');
var draw = require('./drawTable');
var f = require('./filter');
var get = require('./get&map_data');
var sms = require('./sms_configure');
var exprt = require('./export');
var salesFolder = './sales';
var purchasesFolder = './purchases';
var productListFolder = "./product-list";
var Nelisa = require('./whatNelisaWants');

var found = get.quantityPurchasedBy('15-Feb',"Milk 1l");
get.quantityPurchasedBy('15-Feb',"Milk 1l");
// console.log(found);

// console.log(draw.table(draw.dataTable(found)));

// var result = [get.mappedSales()[0][15], get.mappedSales()[1][60], get.mappedSales()[2][5], get.mappedSales()[3][27]];


// var result = group.salesByProduct()[0][0];
// console.log(result);

//
// var data = f.filterData(get.mappedSales()[2], [["product","Milk 1l"]]);
// var result = data.sort(f.sortBy('date'));
// console.log(result);
// console.log(draw.table(draw.dataTable(result)));


// var purchases = get.mappedPurchases();
// get.costAndLogSaleAt("11-Feb", "Iwisa Pap 5kg", 20, purchases);
// var result = get.inventoryRemainingAt("11-Feb", "Iwisa Pap 5kg", purchases);

// var result = f.filterData(group.salesByProduct()[0],[["product","Mixed Sweets 5s"]])[0].unitPrice;

// var result = f.filterData(get.mappedSales()[1],[["category","Miscellaneous"]]);
// var object = group.salesByCategory()[2][1];
// console.log(object);
// console.log(draw.table(draw.dataTable(result)));
// var result = group.salesByProduct()[1].sort(f.sortBy("profit"));
// var result2 = group.salesByCategory()[1].sort(f.sortBy("profit"));
// console.log(result);
// console.log(result2);
// console.log(draw.table(draw.dataTable(result)));
// console.log(draw.table(draw.dataTable(result2)));
var result = Nelisa.whatSheWants()[1];
console.log(result);
