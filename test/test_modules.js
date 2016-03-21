var group = require('../group_data');
// var chaiassert = require('chai').assert;
var assert = require('assert');
var _ = require('lodash');
var d = require('../drawTable');
var f = require('../filter');
var get = require('../get&map_data');
var sms = require('../sms_configure');
var exprt = require('../export');

describe('GET&MAP_DATA', function() {

      it('get.rawPurchasesData should...extract raw purchases data from purchases.csv and return line items as string separated by ";"\nCommas at digits should also be replaced by a period', function() {
            var result = get.rawPurchasesData().filter(function(i,idx) {return idx === 0 || idx === 44 || idx === 152;});
            assert.deepEqual(result, ["Makro;23-Jan;Chakalaka Can;3;R7.00;R21.00", "Makro;6-Feb;Iwisa Pap 5kg;5;R20.00;R100.00", "Joe Spaza Shop;01-Mar;Top Class Soy Mince;3;R11.00;R33.00"] );
      });

      it('get.rawPurchasesDataConverted should...split each line item into an array and convert quantity and unitPrice to number format.', function() {
            var result = get.rawPurchasesDataConverted().filter(function(i,idx) {return idx === 4 || idx === 73 || idx === 143;});
            assert.deepEqual(result, [["Makro", "23-Jan", "Gold Dish Vegetable Curry Can", 2, 5, "R10.00"],["Makro","13-Feb","Milk 1l",15,7,"R105.00"],["HomeMade","28-Feb","Shampoo 1 litre",2,20,"R40.00"]]);
      });

      it('get.mappedPurchases should...return an array of objects each containing a unique product name. Thus the array length should be the same as the number of products.', function() {
            var result = get.mappedPurchases().length;
            assert.equal(result, 18);
      });

      it('get.mappedPurchases should...reduce raw purchases data to return an object containing a unique product name with all the purchases made for that product.', function() {
            var result = get.mappedPurchases().filter(function(i) {return i.product === "Coke 500ml" || i.product === "Valentine Cards";});
            assert.deepEqual(result, [{product: "Coke 500ml", purchases: [{date: "23-Jan", quantity: 3, remaining: 3, unitCost: 3.5, supplier: "Makro"},{date: "28-Jan", quantity: 36, remaining: 36, unitCost: 3.5, supplier: "Makro"},{date: "6-Feb", quantity: 36, remaining: 36, unitCost: 3.5, supplier: "Makro"},{date: "10-Feb", quantity: 18, remaining: 18, unitCost: 3.5, supplier: "Makro"},{date: "13-Feb", quantity: 12, remaining: 12, unitCost: 3.5, supplier: "Makro"},{date: "17-Feb", quantity: 24, remaining: 24, unitCost: 3.5, supplier: "Makro"},{date: "24-Feb", quantity: 18, remaining: 18, unitCost: 3.5, supplier: "Makro"},{date: "27-Feb", quantity: 24, remaining: 24, unitCost: 3.5, supplier: "Makro"}]},{product: "Valentine Cards", purchases: [{date: "11-Feb", quantity: 20, remaining: 20, unitCost: 2, supplier: "HomeMade"}]}]);
      });

      it('get.rawSalesData should...return an array of arrays. There should be one array for each week.', function() {
            var result = get.rawSalesData().length;
            assert.equal(result, 4);
      });

      it('get.rawSalesData should...extract sales data for each week from given files and return a list of arrays, one for each week (in order) and each item a string representing a line item in raw csv format', function() {
            var result = get.rawSalesData().reduce(function(arr,i){arr.push(i[3]);return arr;},[]);
            assert.deepEqual(result, ["Sunday,1-Feb,Chakalaka Can,3,R10.00","Sunday,8-Feb,Chakalaka Can,1,R10.00","Sunday,15-Feb,Chakalaka Can,3,R10.00","Sunday,22-Feb,Chakalaka Can,0,R10.00"]);
      });

      it('get.salesArray should...takes single array (i.e. one week) from the output from rawSalesData() (which is still in csv format) and splits each comma separated line item into an array. Ultimately returning an array of arrays.', function() {
            var output = get.rawSalesData();
            var result = get.salesArray(output[0])[0];
            assert.deepEqual(result, ["Sunday","1-Feb","Milk 1l","3","R10.00"]);
      });

      it('get.productList: Its length should be equal to the number of unique products sold in a month.', function() {
            var array = group.salesByProduct();
            var list = f.concat(array);
            var result = get.productList(list).length;
            // console.log(get.productList(list));
            assert.equal(result, 18);
      });

      // var list = f.concat(groupSalesByProduct());
      // var result = get.productList(list);
      it('get.productList should...take a list of all sales in a month and return an array of unique products sold in that month', function() {
            var array = group.salesByProduct();
            var list = f.concat(array);
            var result = get.productList(list);
            assert.deepEqual(result, ["Milk 1l","Imasi","Bread", "Chakalaka Can", "Gold Dish Vegetable Curry Can", "Fanta 500ml", "Coke 500ml", "Cream Soda 500ml", "Iwisa Pap 5kg", "Top Class Soy Mince", "Shampoo 1 litre", "Soap Bar", "Bananas - loose", "Apples - loose", "Mixed Sweets 5s", "Heart Chocolates", "Rose (plastic)", "Valentine Cards"]);
      });

      it('get.category should...take a product name as parameter and return its category', function() {
            var catMap = get.mappedCategories();
            var result = [get.category(catMap, "Bread"), get.category(catMap, "Valentine Cards"), get.category(catMap, "Gold Dish Vegetable Curry Can"), get.category(catMap, "Coke 500ml"), get.category(catMap, "Mixed Sweets 5s"), get.category(catMap, "Apples - loose")];
            assert.deepEqual(result, ["Food", "Miscellaneous", "Canned Food", "Soda", "Sweets", "Fruit"]);
      });

      it('get.findPurchases should...take an product name and mapped purchases list as parameter and return all purchases relating to that product.', function() {
            var purchases = get.mappedPurchases();
            var result = get.findPurchases("Heart Chocolates", purchases);
            assert.deepEqual(result, [{date: "10-Feb", quantity: 20, remaining: 20, unitCost: 25, supplier: "Makro" }]);
      });

      it('get.cost should...calculate the total cost of a sale.', function() {
            var purchases = get.mappedPurchases();
            var result = get.cost(purchases, "3-Feb", "Milk 1l", 10);
            assert.equal(result, 70);
      });

      it('get.cost should...deduct the quantity sold from the product\'s purchases.remaining property.\nNB if the total sale is greater than the first supply purchase then the quantity remaining after deducting from the first purchase should be deducted from the next purchase.', function() {
            var purchases = get.mappedPurchases();
            get.cost(purchases, "3-Feb", "Milk 1l", 10);
            var result = get.findPurchases("Milk 1l", purchases).filter(function(i,idx){return idx === 0 || idx === 1;});
            assert.deepEqual(result, [{date: "23-Jan", quantity: 4, remaining: 0, unitCost: 7, supplier: "Makro"},{date: "28-Jan", quantity: 25, remaining: 19, unitCost: 7, supplier: "Makro"}]);
      });

      it('get.cost should...be sensitive to date. You cannot sell what you do not have. If all quantities purchased have already been sold at the date of sale, even if there are other purchases at a later date, the later purchases should not be affected.shthe sale should return no revenue,or profit and the total cost should be zero.', function() {
            var purchases = get.mappedPurchases();
            get.cost(purchases, "14-Feb", "Bananas - loose", 32);
            get.cost(purchases, "17-Feb", "Bananas - loose", 10);
            var result = get.findPurchases("Bananas - loose", purchases).filter(function(i,idx){return idx === 4 || idx === 5;});
            assert.deepEqual(result, [{date: "13-Feb", quantity: 4, remaining: 0, unitCost: 1, supplier: "Epping Market"},{date: "20-Feb", quantity: 20, remaining: 20, unitCost: 1, supplier: "Epping Market"}]);
      });

      it('get.cost should...calculate total cost using the first-in-first-out principle.', function() {
        var purchases = get.mappedPurchases();
            var result = get.cost(purchases, "15-Feb", "Bread", 32);
            assert.equal(result, 292);
      });

      it('get.mappedSales should...reduce raw sales data to return a list of arrays (one for each week).', function() {
            var result = get.mappedSales().length;
            assert.equal(result, 4);
      });

      it('get.mappedSales: arrays should be sorted by week.', function() {
            var result = get.mappedSales().reduce(function(arr, i){arr.push(i[0].week); return arr;},[]);
            assert.deepEqual(result, ['week1','week2','week3','week4']);
      });

      it('get.mappedSales: Each object should include the following: week, day, date, category, product, quantity, unitPrice, revenue, totalcost, and profit.', function() {
            var object = get.mappedSales()[2][5];
            var result = Object.keys(object).reduce(function(arr, key){arr.push(key);return arr;},[]);
            assert.deepEqual(result, ['week','day','date','category','product','quantity','unitPrice','revenue','totalcost','profit']);
      });

      it('get.mappedSales: It is important that the revenue,total cost, and profit are all calculated accurately.', function() {
            var result = [get.mappedSales()[0][15], get.mappedSales()[1][60], get.mappedSales()[2][5], get.mappedSales()[3][27]];
            assert.deepEqual(result, [{week: 'week1', day: 'Monday', date: '2-Feb', category: 'Food', product: 'Milk 1l', quantity: 4, unitPrice: 10, revenue: 40, totalcost: 28, profit: 12},{week: 'week2', day: 'Wednesday', date: '11-Feb', category: 'Fruit', product: 'Apples - loose', quantity: 3, unitPrice: 2, revenue: 6, totalcost: 4.5, profit: 1.5},{week: 'week3', day: 'Sunday', date: '15-Feb', category: 'Soda', product: 'Fanta 500ml', quantity: 5, unitPrice: 6.5, revenue: 32.5, totalcost: 22.5, profit: 10},{week: 'week4', day: 'Monday', date: '23-Feb', category: 'Fruit', product: 'Bananas - loose', quantity: 2, unitPrice: 2, revenue: 4, totalcost: 2, profit: 2}]);
      });

      it('get.mappedSales should...be sensitive to date. You cannot sell what you do not have. If all quantities purchased have already been sold at the date of sale, even if there are other purchases at a later date, the sale should reflect no revenue or profit and the total cost should be zero.\nNB: Bananas sold on 17-Feb is such an example. There is no supply left so there should be no profit or revenue from such a sale.', function() {
            var result = get.mappedSales()[2].find(function(i){return i.date === "17-Feb" && i.product === "Bananas - loose";});
            var expected = {week: "week3", day: "Tuesday", date: "17-Feb", category: "Fruit", product: "Bananas - loose", quantity: 2, unitPrice: 2, revenue: 0, totalcost: 0, profit: 0};
            assert.deepEqual(result, {week: "week3", day: "Tuesday", date: "17-Feb", category: "Fruit", product: "Bananas - loose", quantity: 2, unitPrice: 2, revenue: 0, totalcost: 0, profit: 0});
            // chaiassert(result===expected, "Success: No profit or revenue reflected from sale of bananas on 17-Feb.");
      });


 });

 // describe('GROUP_DATA', function() {
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //      it(' should...', function() {
 //            var result =
 //            assert.deepEqual(result, );
 //      });
 //
 //  });

 describe('SMS_CONFIGURE', function() {

      it('sms.content should...(when printed to the screen) display each item on a new line. There should be 11 new line and therfore 10 newline characters.', function() {
            var result = sms.content().match(/\n/g).length;
            assert.deepEqual(result, 10);
      });

      it('sms.content should...contain no more than 160 characters.', function() {
            var result = sms.content().length;
            assert.ok(result <= 160, "sms content is no more than 160 characters.");
      });

  });
