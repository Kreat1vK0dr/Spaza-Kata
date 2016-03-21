var group = require('./group_data');
var draw = require('./drawTable');
var f = require('./filter');
var get = require('./get&map_data');
var sms = require('./sms_configure');
var exprt = require('./export');
var salesFolder = './sales';
var purchasesFolder = './purchases';
var productListFolder = "./product-list";

// var filter = f.filterData(f.concat(get.mappedSalesData()),[['week','week1,week2'],['product','Gold Dish Vegetable Curry Can']]);
    // console.log(filterDetailedDataBy('week','week1','product','Gold Dish Vegetable Curry Can'));
    // console.log(draw.table(draw.dataTable(filter)));
    // console.log(filter);

// FILTER GROUP BY PRODUCT************************************************************************

var byProduct = f.concat(group.salesByProduct());
var filtered = f.filterData(byProduct,[['week','week2'],['category','Sweets']]);
// var sorted = byProduct.sort(f.sortBy('quantity'));
// console.log(draw.table(draw.dataTable(filtered)));
// console.log(groupSalesByProduct());

// FILTER GROUP BY CATEGORY************************************************************************
var byCategory = f.concat(group.salesByCategory());
var sorted = byCategory.sort(f.sortBy('quantity'));
var filtered = f.filterData(sorted,[['week','week2'],['category','Sweets']]);
// console.log(draw.table(draw.dataTable(byCategory)));
// console.log(groupSalesByCategory().length);
// console.log(draw.table(draw.dataTable(sorted)));
// console.log(filtered);
// console.log(draw.table(draw.dataTable(filtered)));

// TEST IMPORTED MODULES************************************************************************
console.log(sms.content().length);
