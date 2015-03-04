
var MapReducer = function(map,reduce){
	var mapRowsToKeys = function(map, reduce, inputData){
		var mappedKeyValues = [];
		inputData.forEach(function(inputRow){
			GLOBAL.emit = function(key,value){
				mappedKeyValues.push(key, [value]);
			};
		
			var mapBoundToInputRow = map.bind(inputRow);
			mapBoundToInputRow(inputRow);
		});

		return mappedKeyValues;
	}

	this.run = function(inputData){
		var mappedKeyValues = mapRowsToKeys(map, reduce, inputData);

		// Reduce here pls.

		return mappedKeyValues;
	};
};

module.exports = MapReducer;