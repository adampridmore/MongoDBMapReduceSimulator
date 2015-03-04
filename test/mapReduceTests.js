var MapReducer = require('../components/MapReducer.js');

exports.test1 = function(test){
	test.expect(1);
	test.equal(true,true);
	test.done();
};

exports.test2 = function(test){
	debugger;

	test.expect(1);
	
	var map = function(){
		var key = this.orderNumber;
		var value = {
			productCount: 1
		};

		emit(key, value);
	};

	var reduce = function(){

	};

	var mapReducer = new MapReducer(map,reduce);

	var inputData = [{
		orderNumber: 100,
		productNumber: 'abc',
		productQuantity: 2
	},{
		orderNumber: 100,
		productNumber: 'def',
		productQuantity: 3
	}];

	var outputData = mapReducer.run(inputData);

	console.log(JSON.stringify(outputData));

	test.equal(1, outputData.length);

	test.done();
};

exports.test3 = function(test){
	var module = {
		x: 11
	};

	var myFunction = function(){
		console.log(this.x);
	};

	var myNewFunction = myFunction.bind(module);

	myNewFunction();

	test.done();
};