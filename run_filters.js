var data = require('./group_data');
var draw = require('./drawTable');
var f = require('./filter');
var get = require('./get&map_data');
var exprt = require('./export');
var salesFolder = './sales';
var purchasesFolder = './purchases';
var productListFolder = "./product-list";

// var filter = f.filterData(f.concat(get.mappedSalesData()),[['week','week1,week2'],['product','Gold Dish Vegetable Curry Can']]);
    // console.log(filterDetailedDataBy('week','week1','product','Gold Dish Vegetable Curry Can'));
    // console.log(draw.table(draw.dataTable(filter)));
    // console.log(filter);

var extract = f.concat(groupSalesByProduct());

var find = extract.filter(function(item) {
  return item.week === 'week4';
});

var extract = f.concat(groupSalesByProduct());
// console.log(extract);
var find = f.filterData(extract, [['week','week4']]);
// console.log(find);
var sorted = find.sort(f.sortBy('quantity'));
// console.log(draw.table(draw.dataTable(sorted)));

var byProduct = f.concat(groupSalesByProduct());
var filtered = f.filterData(byProduct,[['product','Heart Chocolates'],['week','week2']]);
var sorted = byProduct.sort(f.sortBy('quantity'));
// console.log(draw.table(draw.dataTable(byProduct)));
// console.log(groupSalesByProduct());


var byCategory = f.concat(groupSalesByCategory());
var sorted = byCategory.sort(f.sortBy('quantity'));
var filtered = f.filterData(sorted,[['week','week1']]);
// console.log(draw.table(draw.dataTable(byCategory)));
// console.log(groupSalesByCategory().length);
// console.log(draw.table(draw.dataTable(sorted)));
// console.log(filtered);
// console.log(draw.table(draw.dataTable(filtered)));
