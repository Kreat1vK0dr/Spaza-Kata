var group = require('./group_data');
var nelisa = require('./whatNelisaWants');
var draw = require('./drawTable');
var f = require('./filter');
var get = require('./get&map_data');
var sms = require('./sms_configure');
var exprt = require('./export');

// GET&MAP_DATA: RAW PURCHASES
// console.log(get.rawPurchasesData());

// GET&MAP_DATA: PURCHASES CONVERTED
// console.log(get.rawPurchasesDataConverted()[0]);

// GET&MAP_DATA: MAPPED PURCHASES
// console.log(get.mappedPurchases()[0]);
// console.log(get.mappedPurchases()[0].purchases);
// console.log(draw.table(draw.dataTable(get.mappedPurchases()[0].purchases)));

// GET&MAP_DATA: RAW SALES DATA
// console.log(get.rawSalesData());

// GET&MAP_DATA: SALES INTO ARRAYS
// var data = get.rawSalesData()[0];
// var arrays = get.salesArray(data)[0];
// console.log(arrays);

// GET&MAP_DATA: MAPPED SALES
// console.log(get.mappedSales()[0][0]);
// var data = [get.mappedSales()[0][0]];
// console.log(draw.table(draw.dataTable(data)));

// GROUP_DATA

// salesByProduct
// console.log(group.salesByProduct()[0]);
// console.log(draw.table(draw.dataTable(group.salesByProduct()[0])));

// salesByCategory
// var data = group.salesByCategory()[0];
// console.log(data);
// console.log(draw.table(draw.dataTable(data)));

// WHAT NELISA WANTS
// console.log(nelisa.whatSheWants());

// CONFIGURE_SMS
console.log(sms.content());


// FILTER

//Filter mappedSales
// var data = f.concat(get.mappedSales());
// var filtered = f.filterData(data, [["week","week3"]]);
// var filtered = f.filterData(data, [["week","week3"],["product", "Bread"]]);
// var filtered = f.filterData(data, [["week","week3"],["product", "Bread"]);
// var filtered = f.filterData(data, [["week","week1,week3"],["product", "Bread,Top Class Soy Mince"]]);
// console.log(draw.table(draw.dataTable(filtered)));
