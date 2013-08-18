Description
===========

Boardwalk is a lightweight utility for rich operations with Javascript object properties.

Installation
============

    npm install boardwalk

Examples
========

* Find intersection of two rich objects:

```javascript
/* First example object. */
var object1 = {
	owner: {
		first_name: 'John',
		last_name: 'Adams'
	},
	location: {
		city: 'Philadelphia',
		state: 'Pennsylvania'
	}
};

/* Second example object. */
var object2 = {
	owner: {
		first_name: 'Samuel',
		last_name: 'Adams'
	},
	location: {
		city: 'Philadelphia',
		state: 'Pennsylvania'
	}
};

/* Pass in objects as an array. */
var result = boardwalk.intersect([object1, object2]);

/* Result object. */
{
	owner: {
		last_name: 'Adams'
	},
	location: {
		city: 'Philadelphia',
		state: 'Pennsylvani'
	}
}
```

* Find intersection of multiple objects

```javascript
/* First example object. */
var object1 = {
	owner: {
		first_name: 'John',
		last_name: 'Adams'
	}
};

/* Second example object. */
var object2 = {
	owner: {
		first_name: 'John',
		last_name: 'Kennedy'
	}
};

/* Third example object. */
var object3 = {
	owner: {
		first_name: 'John',
		last_name: 'Tyler'
	}
};

/* Fourth example object. */
var object4 = {
	owner: {
		first_name: 'Ronald',
		last_name: 'Reagan'
	}
};

var result = boardwalk.intersect([object1, object2, object3, object4]);

/* Result object. */
{
	owner: {
		first_name: 'John'
	}
}
```

* Find intersection between arrays:

```javascript
/* First example array. */
var array1 = ['abc', 'def', 'ghi'];

/* Second example array. */
var array2 = ['def', 'jkl', 'mno'];

var result = boardwalk.intersect([array1, array2]);

/* Result array. */
['def']
```

* Find intersection between complex objects:

```javascript
/* First example object. */
var object1 = {
	owner: {
		first_name: 'Theodore',
		last_name: 'Roosevelt',
		children: ['John', 'Jane', 'Jack', { name: 'Jill' }]
	}		
};

/* Second example object. */
var object2 = {
	owner: {
		first_name: 'Franklin',
		last_name: 'Roosevelt',
		children: ['Jane', { name: 'Jill' }]
	}
};

var result = boardwalk.intersect([object1, object2]);

/* Result object. */
{
	owner: {
		last_name: 'Roosevelt',
		children: ['Jane', { name: 'Jill' }]
	}
}
```

* Pass a generic property that will match wherever it is found in object graphs:

```javascript
/* First example object. */
var object1 = {
	owner: {
		first_name: 'George',
		last_name: 'Washington'
	}
};

/* Second example object. */
var object2 = {
	owner: {
		first_name: 'George',
		last_name: 'Bush'
	}
};

/* Pass in generic property on options object. */
var options = { generic: 'Washington' };

var result = boardwalk.intersect([object1, object2], options);

/* Result object. */
{
	owner: {
		first_name: 'George',
		last_name: 'Washington' // Generic match
	}
}
```

API
===

Helper functions
----------------

* **isArray**(item) - Utility function to determine if item is an Array.

* **isObject**(item) - Utility function to determine if item is an Object.

* **isEmpty**(object) - Utility function to determine if object is empty.

Object handling functions
----------------

* **intersect**(items, options) - Utility function to determine the common properties of two items.

* **resolve**(path, object) - Utility function to resolve a deep object property.

* **set**(path, object, value) - Utility function to set a deep object property.