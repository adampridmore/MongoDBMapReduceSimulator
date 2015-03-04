
var MapReducer = function(map,reduce){
	var mapRowsToKeyValues = function(map, reduce, inputData){
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

	var group = function(mappedKeyValues){
		var grouped = {};

		mappedKeyValues.forEach(function(keyValue){
			var values = grouped[keyValue.key];
			if (values === undefined){
				values = [keyValue.value];
				grouped[keyValue.key] = values;
			}else{
				values.push(keyValue.value);
			}
		});

		return grouped;
	};

	var reducer = function(groupedValues){
		var reducedValues = {};
		
		for(var key in groupedValues){
			var values = groupedValues[key];
			var reducedValue = reduce(key,values);
			reducedValues[key] = reducedValue;
		}

		return reducedValues;
	};

	this.run = function(inputData){
		var mappedKeyValues = mapRowsToKeyValues(map, reduce, inputData);

		var groupedKeyValues = group(mappedKeyValues);

		var reducedValues = reducer(groupedKeyValues);

		return reducedValues;
	};
};

module.exports = MapReducer;