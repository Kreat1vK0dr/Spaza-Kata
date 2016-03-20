var _ = require('lodash');
var fs = require('fs');
var get = require('./get&map_data');
var f = require('./filter');
var salesFolder = './sales';
var purchasesFolder = './purchases';
var productListFolder = "./product-list";

//NOTE: AVOID THE USE OF REPETITVE FILTERS IF YOU CAN LOOP. FILTERS ARE TIME CONSUMING. ESPECIALLY IF YOU HAVE LARGE AMOUNTS OF DATA.

function groupSalesByProduct() {
  // var dataSummarized = [];
    var data = get.mappedSales();

    return data.reduce(function(allSummary, week){
      var keeptrack = {};
      allSummary.push(week.reduce(function(weekSum, sale) {
              if (!keeptrack[sale.product]) {
                keeptrack[sale.product] = 1;
                weekSum.push({week: sale.week, category: sale.category, product: sale.product, quantity: sale.quantity, unitPrice: sale.unitPrice, revenue: sale.revenue, totalcost: sale.totalcost, profit: sale.profit });
              } else {
                  var product = weekSum.find(function(item) {return item.product === sale.product;});
                  product.quantity += sale.quantity;
                  product.revenue += sale.revenue;
                  product.totalcost += sale.totalcost;
                  product.profit += sale.profit;

                  if (typeof product.unitPrice!== 'object' && product.unitPrice!==sale.unitPrice) {
                    product.unitPrice = [product.unitPrice, sale.unitPrice];
                  } else if (typeof product.unitPrice === 'object' && product.unitPrice.indexOf(sale.unitPrice)===-1) {
                    product.unitPrice.push(sale.unitPrice);
                  }
              }

        return weekSum;
      },[])
    );
    return allSummary;
    },[]);
      // return dataSummarized;
  }

function groupSalesByCategory () {
  var data = groupSalesByProduct();

    return data.reduce(function(allWeekSum, week){
        var keeptrack = {};
        allWeekSum.push(week.reduce(function(weekSum, product){
                if (!keeptrack[product.category]) {
                  keeptrack[product.category] = 1;
                  weekSum.push({week: product.week, category: product.category, quantity: product.quantity, unitPrice: product.unitPrice, revenue: product.revenue, totalcost: product.totalcost, profit: product.profit});
                } else {
                  var category = weekSum.find(function(item) {return item.category === product.category;});
                  category.quantity += product.quantity;
                  category.revenue += product.revenue;
                  category.totalcost += product.totalcost;
                  category.profit += product.profit;

                  if (typeof category.unitPrice!== 'object' && category.unitPrice!==product.unitPrice) {
                    category.unitPrice = [category.unitPrice, product.unitPrice];
                  } else if (typeof category.unitPrice === 'object' && category.unitPrice.indexOf(product.unitPrice)===-1) {
                    category.unitPrice.push(product.unitPrice);
                  }
                }
                return weekSum;
          },[]));
          return allWeekSum;
    },[]);
  }
// console.log(groupSalesByCategory());


//****************************************************
function returnWhatNelisaWants() {
  var data = groupSalesByProduct();
  var dataCat = groupSalesByCategory();
          // NOTE: USING REDUCE HERE INSTEAD OF FIRST FILTERING TO GET EACH WEEK SAVES HALF THE TIME IT WOULD TAKE IF YOU FIRST FILTER.
          // var weekSummary = [];

          // var weeknames = getWeekNames();
          //
          //   weeknames.forEach(function(week)
          // var data = groupSalesByProduct().filter(function(product) {
          //                 return product.week === week;
          //               });

          var byProduct = data.reduce(function(summary, week) {

            summary.push(week.reduce(function(obj, lineitem){

              if (!obj.week) {
                    obj.week = lineitem.week;
                    obj['most popular product'] = {product: lineitem.product , quantity: lineitem.quantity};
                    obj['least popular product'] = {product: lineitem.product  , quantity: lineitem.quantity};
                    obj['most profitable product'] = {product: lineitem.product, profit: lineitem.profit};
                    obj['least profitable product'] = {product: lineitem.product, profit: lineitem.profit};
                  } else {
                            if (lineitem.quantity > obj['most popular product'].quantity) {
                      obj['most popular product'].product = lineitem.product;
                      obj['most popular product'].quantity = lineitem.quantity;
                      }
                      if (lineitem.quantity < obj['least popular product'].quantity) {
                        obj['least popular product'].product = lineitem.product;
                        obj['least popular product'].quantity = lineitem.quantity;
                      }
                      if (lineitem.profit > obj['most profitable product'].profit) {
                        obj['most profitable product'].product = lineitem.product;
                        obj['most profitable product'].profit = lineitem.profit;
                      }
                      if (lineitem.profit < obj['least profitable product'].profit) {
                        obj['least profitable product'].product = lineitem.product;
                        obj['least profitable product'].profit = lineitem.profit;
                      }

                      // return obj;
                  }
                  return obj;
            },{}));
            return summary;
          },[]);

      for (var i = 0; i<dataCat.length;i++) {
        for (var j = 0; j<dataCat[i].length; j++){
            if (j === 0) {
                  byProduct[i]['most popular category'] = {category: dataCat[i][j].category, quantity: dataCat[i][j].quantity};
                  byProduct[i]['least popular category'] = {category: dataCat[i][j].category, quantity: dataCat[i][j].quantity};
                  byProduct[i]['most profitable category'] = {category: dataCat[i][j].category, profit: dataCat[i][j].profit};
                  byProduct[i]['least profitable category'] = {category: dataCat[i][j].category, profit: dataCat[i][j].profit};
                } else {
                        if (dataCat[i][j].quantity > byProduct[i]['most popular category'].quantity) {
                  byProduct[i]['most popular category'].category = dataCat[i][j].category;
                  byProduct[i]['most popular category'].quantity = dataCat[i][j].quantity;
                  }
                  if (dataCat[i][j].quantity < byProduct[i]['least popular category'].quantity) {
                    byProduct[i]['least popular category'].category = dataCat[i][j].category;
                    byProduct[i]['least popular category'].quantity = dataCat[i][j].quantity;
                  }
                  if (dataCat[i][j].profit > byProduct[i]['most profitable category'].profit) {
                    byProduct[i]['most profitable category'].category = dataCat[i][j].category;
                    byProduct[i]['most profitable category'].profit = dataCat[i][j].profit;
                  }
                  if (dataCat[i][j].profit < byProduct[i]['least profitable category'].profit) {
                    byProduct[i]['least profitable category'].category = dataCat[i][j].category;
                    byProduct[i]['least profitable category'].profit = dataCat[i][j].profit;
                  }
                }
        }
}
return byProduct;
}

exports.whatNelisaWants = function() {
  return returnWhatNelisaWants();
};

exports.salesByProduct = function() {
  return groupSalesByProduct();
};

exports.salesByCategory = function() {
  return groupSalesByCategory();
};


// console.log(returnWhatNelisaWants());
// var list = f.concat(groupSalesByProduct());
// var result = get.productList(list);
// console.log(result);
