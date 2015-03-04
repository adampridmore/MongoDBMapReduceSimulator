var MapReducer = require('../components/MapReducer.js');

exports.runMapReduce = function(test){
	debugger;

	test.expect(1);
	
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

	//console.log(JSON.stringify(outputData, null, '\t'));

	var expectedData = [{
		_id: "100",
		value: {
			cost:5
		}
	},{
		_id: "200",
		value:{
			cost:4
		}
	}];

	test.deepEqual(outputData, expectedData);

	test.done();
};