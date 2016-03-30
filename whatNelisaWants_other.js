var group = require('./group_data');

function returnWhatNelisaWants() {
  var data = group.salesByProduct();
  var dataCat = group.salesByCategory();

          var byProduct = data.reduce(function(summary, week) {

            summary.push(week.reduce(function(obj, lineitem){

              if (!obj.week) {
                    obj.week = lineitem.week;
                    obj.data = [{what: 'most popular product',product: lineitem.product, quantity: lineitem.quantity, profit: lineitem.profit, profitMargin: lineitem.profitMargin}];
                    obj.data.push({what: 'least popular product', product: lineitem.product, quantity: lineitem.quantity, profit: lineitem.profit, profitMargin: lineitem.profitMargin});
                    obj.data.push({what: 'most profitable product', product: lineitem.product, quantity: lineitem.quantity, profit: lineitem.profit, profitMargin: lineitem.profitMargin});
                    obj.data.push({what: 'least profitable product', product: lineitem.product, quantity: lineitem.quantity, profit: lineitem.profit, profitMargin: lineitem.profitMargin});
                  } else {
                      var mpopP = obj.data.find(function(i) {return i.what === "most popular product";});
                      var lpopP = obj.data.find(function(i) {return i.what === "least popular product";});
                      var mprofP = obj.data.find(function(i) {return i.what === "most profitable product";});
                      var lprofP = obj.data.find(function(i) {return i.what === "least profitable product";});

                            if (lineitem.quantity > mpopP.quantity) {
                      mpopP.product = lineitem.product;
                      mpopP.quantity = lineitem.quantity;
                      mpopP.profit = lineitem.profit;
                      mpopP.profitMargin = lineitem.profitMargin;
                      }
                      if (lineitem.quantity < lpopP.quantity) {
                        lpopP.product = lineitem.product;
                        lpopP.quantity = lineitem.quantity;
                        lpopP.profit = lineitem.profit;
                        lpopP.profitMargin = lineitem.profitMargin;
                      }
                      if (lineitem.profit > mprofP.profit) {
                        mprofP.product = lineitem.product;
                        mprofP.profit = lineitem.profit;
                        mprofP.quantity = lineitem.quantity;
                        mprofP.profitMargin = lineitem.profitMargin;
                      }
                      if (lineitem.profit < lprofP.profit) {
                        lprofP.product = lineitem.product;
                        lprofP.profit = lineitem.profit;
                        lprofP.quantity = lineitem.quantity;
                        lprofP.profitMargin = lineitem.profitMargin;
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
                  byProduct[i].data.push({what: 'most popular category', category: dataCat[i][j].category, quantity: dataCat[i][j].quantity, profit: dataCat[i][j].profit, profitMargin: dataCat[i][j].profitMargin});
                  byProduct[i].data.push({what: 'least popular category', category: dataCat[i][j].category, quantity: dataCat[i][j].quantity, profit: dataCat[i][j].profit, profitMargin: dataCat[i][j].profitMargin});
                  byProduct[i].data.push({what: 'most profitable category', category: dataCat[i][j].category, quantity: dataCat[i][j].quantity, profit: dataCat[i][j].profit, profitMargin: dataCat[i][j].profitMargin});
                  byProduct[i].data.push({what: 'least profitable category', category: dataCat[i][j].category, quantity: dataCat[i][j].quantity, profit: dataCat[i][j].profit, profitMargin: dataCat[i][j].profitMargin});

                } else {
                        var mpopC = byProduct[i].data.find(function(i) {return i.what === 'most popular category';});
                        var lpopC = byProduct[i].data.find(function(i) {return i.what === 'least popular category';});
                        var mprofC = byProduct[i].data.find(function(i) {return i.what === 'most profitable category';});
                        var lprofC = byProduct[i].data.find(function(i) {return i.what === 'least profitable category';});

                        if (dataCat[i][j].quantity > mpopC.quantity) {
                  mpopC.category = dataCat[i][j].category;
                  mpopC.quantity = dataCat[i][j].quantity;
                  mpopC.profit = dataCat[i][j].profit;
                  mpopC.profitMargin = dataCat[i][j].profitMargin;
                  }
                  if (dataCat[i][j].quantity < lpopC.quantity) {
                    lpopC.category = dataCat[i][j].category;
                    lpopC.quantity = dataCat[i][j].quantity;
                    lpopC.profit = dataCat[i][j].profit;
                    lpopC.profitMargin = dataCat[i][j].profitMargin;
                  }
                  if (dataCat[i][j].profit > mprofC.profit) {
                    mprofC.category = dataCat[i][j].category;
                    mprofC.profit = dataCat[i][j].profit;
                    mprofC.quantity = dataCat[i][j].quantity;
                    mprofC.profitMargin = dataCat[i][j].profitMargin;
                  }
                  if (dataCat[i][j].profit < lprofC.profit) {
                    lprofC.category = dataCat[i][j].category;
                    lprofC.profit = dataCat[i][j].profit;
                    lprofC.quantity = dataCat[i][j].quantity;
                    lprofC.profitMargin = dataCat[i][j].profitMargin;
                  }
                }
        }
}
return byProduct;
}

exports.whatSheWants = function() {
  return returnWhatNelisaWants();
};
