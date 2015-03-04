
var MapReducer = function(map,reduce){
	var mapRowsToKeyValues = function(inputData){
		var mappedKeyValues = [];
		inputData.forEach(function(inputRow){
			GLOBAL.emit = function(key,value){
				var keyValue = {
					key:key, value: value
				};
				
				mappedKeyValues.push(keyValue);
			};
		
			var mapBoundToInputRow = map.bind(inputRow);
			mapBoundToInputRow(inputRow);
		});

		return mappedKeyValues;
	};

	var groupByKeys = function(keyValues){
		var groupedKeyValues = {};

		keyValues.forEach(function(keyValue){
			var values = groupedKeyValues[keyValue.key];
			if (values === undefined){
				values = [keyValue.value];
				groupedKeyValues[keyValue.key] = values;
			} else {
				values.push(keyValue.value);
			}
		});

		return groupedKeyValues;
	};

	var reduceValues = function(groupedValues){
		var reducedValues = {};
		
		for(var key in groupedValues){
			var values = groupedValues[key];
			var reducedValue = reduce(key,values);
			reducedValues[key] = reducedValue;
		}

		return reducedValues;
	};

	this.run = function(inputRows){
		var keyValues = mapRowsToKeyValues(inputRows);
		var groupedKeyValues = groupByKeys(keyValues);
		return reduceValues(groupedKeyValues);
	};
};

module.exports = MapReducer;