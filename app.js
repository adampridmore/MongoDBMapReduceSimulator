var MapReducer = require('./components/MapReducer.js');

var map = function(){
	var key = this.orderNumber;
	var value = {
		cost: this.cost
	};

	emit(key, value);
};

var reduce = function(key, values){
	var reducedValues = {
		cost: 0
	};
	values.forEach(function(value){
		reducedValues.cost += value.cost;
	});

	return reducedValues;
};

var inputData = [{
	orderNumber: "100",
	productNumber: 'a',
	cost: 2
},{
	orderNumber: "100",
	productNumber: 'b',
	cost: 3
},{
	orderNumber: "200", 
	productNumber: 'c',
	cost: 4
}];

var mapReducer = new MapReducer(map,reduce);
var outputData = mapReducer.run(inputData);

//console.log(JSON.stringify({map: map.toString(), reduce: reduce.toString()},null, '\t'));
console.log(JSON.stringify(inputData,null, '\t'));
console.log(JSON.stringify(outputData, null, '\t'));