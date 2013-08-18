'use strict';

/**
 * Utility function to determine if item is an Array.
 * 
 * @param {Any} item Item to check
 * @return {Boolean} Returns true if item is an Array.
 */
function isArray(item) {
	return Object.prototype.toString.call(item) == '[object Array]';
}

/**
 * Utility function to determine if item is an Object.
 * 
 * @param {Any} item Item to check
 * @return {Boolean} Returns true if item is an Object.
 */
function isObject(item) {
	return Object.prototype.toString.call(item) == '[object Object]';
}

/**
 * Utility function to determine if object is empty.
 * 
 * @param {Object} obj Object to check
 * @return {Boolean} Returns true if object is empty or not a valid Object.
 */
function isEmpty(obj) {
	if (typeof obj == 'number' || typeof obj == 'string') return false;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

/**
 * Utility function to determine the commonality between two items. Intended to be used as 
 * part of a recursive algorithm.
 *
 * @param {Array} items Array of items to be compared.
 * @param {Object} options Options object.
 *
 * @return {Object} Returns object containing common properties of both objects.
 */
function intersect (items, options) {
	var item1 = items.shift(),
		item2 = items.shift(),
		options = options || {},
		result;

	/* If either item matches generic, return generic. */
	if (!!options.generic && (item1 == options.generic || item2 == options.generic)) return options.generic;
	
	/* Return undefined if items are not the same type. */
	if (typeof item1 !== typeof item2) return undefined;

	/* Check for primitive equality. */
	if (item1 == item2) {
		return item1;
	}

	/* If items are arrays, compare and return result. */
	else if (isArray(item1) && isArray(item2)) {
		console.log('arrays');
		result = [];

		for (var i = 0, len1 = item1.length; i < len1; i++) {
			var sub1 = item1[i];
			for (var j = 0, len2 = item2.length; j < len2; j++) {
				var sub2 = item2[j];
				
				var subsub = intersect([sub1, sub2], options);

				if (!isEmpty(subsub)) {
					result.push(subsub);
					item2.splice(j, 1);
					break;
				}
			}
		}
	}

	/* If items are objects, examine recursively. */
	else if (isObject(item1) && isObject(item2)) {
		result = {};

		for (var prop in item1) {
			if (item1.hasOwnProperty(prop) && item2.hasOwnProperty(prop)) {
				var sub = intersect([item1[prop], item2[prop]], options);
				if (!isEmpty(sub)) {
					result[prop] = sub;
				}
			}
		}
	}

	items.unshift(result);

	if (items.length > 1) {
		return intersect(items, options);
	}

	return result;
}

/**
 * Utility function to resolve a deep object property.
 * 
 * @param  {String} path String path to property
 * @param  {Object} object Object containing property to be resolved
 * 
 * @return {Any} Returns result for resolved property.
 */
function resolve (path, object) {
	var obj = object,
		properties = path.split('.');
		
	for (var i = 0, len = properties.length; i < len; i++) {
		obj = obj[properties[i]];
	}
	
	return obj;
}

/**
 * Utility function to set a deep object property.
 * 
 * @param {String} path String path to property
 * @param {Object} object Object to set property on
 * @param {Any} value Value to set property to
 * 
 * @return {Any} Returns result for set property.
 */
function set (path, object, value) {
	var obj = object,
		properties = path.split('.'),
		prop = properties.shift();

	if (properties.length > 0) {
		obj[prop] = set(properties.join('.'), {}, value);
	} else {
		obj[prop] = value;
	}

	return obj;
}

module.exports = {
	isArray: isArray,
	isObject: isObject,
	intersect: intersect,
	resolve: resolve,
	set: set
};