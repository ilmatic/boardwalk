'use strict';

var chai = require('chai'),
	boardwalk = require('./boardwalk'),
	expect = chai.expect;

describe('isObject(item)', function () {
	it('returns true if passed an object.', function () {
		var object = {};

		var result = boardwalk.isObject(object);

		expect(result).to.be.true;
	});
});

describe('intersect', function () {
	describe('intersecting primitives.', function () {
		it('should return primitive result if passed equal primitives.', function () {
			var item1 = 'abc',
				item2 = 'abc',
				result;

			result = boardwalk.intersect([item1, item2]);

			console.log(result);

			expect(result).to.equal('abc');
		});

		it('should return undefined if unequal primitives.', function () {
			var item1 = 'abc',
				item2 = 'def',
				result;

			result = boardwalk.intersect([item1, item2]);

			console.log(result);

			expect(result).to.be.undefined;
		});
	});

	describe('intersecting arrays', function () {
		it('returns an array containing the common elements of two arrays, position-agnostic.', function () {
			var array1 = [0,1,2,3],
				array2 = [2,3,4,5],
				result;
			
			result = boardwalk.intersect([array1, array2]);

			console.log(result);
			
			expect(result[0]).to.equal(2);
			expect(result[1]).to.equal(3);
		});
	});

	describe('intersecting objects', function () {
		it('returns an object containing the common properties of two objects', function () {
			var object1 = {
				first_name: 'Isaac Lee',
				last_name: 'Morris'
			};

			var object2 = {
				first_name: 'Samuel',
				last_name: 'Morris'
			};

			var result = boardwalk.intersect([object1, object2]);

			console.log(result);

			expect(result.last_name).to.equal('Morris');

			expect(result.first_name).to.be.undefined;
		});
	});

	describe('deep intersecting objects', function () {
		it('returns an object containing deep common properties of two objects', function () {
			var object1 = {
				person: {
					first_name: 'Isaac Lee',
					last_name: 'Morris'
				}
			};

			var object2 = {
				person: {
					first_name: 'Samuel',
					last_name: 'Morris'
				}
			};

			var result = boardwalk.intersect([object1, object2]);

			console.log(result);

			expect(result.person.last_name).to.equal('Morris');
		});

		it('only intersects object properties that exist on the same level', function () {
			var object1 = {
				person: {
					first_name: 'Isaac Lee',
					last_name: 'Morris'
				}
			};

			var object2 = {
				person: {
					person: {
						first_name: 'Isaac Lee'
					},
					last_name: 'Morris'
				}
			};

			var result = boardwalk.intersect([object1, object2]);

			console.log(result);

			expect(result).to.have.deep.property('person.last_name', 'Morris');

			expect(result).to.not.have.deep.property('person.first_name');
		});
	});

	describe('deep intersecting nested arrays.', function () {
		it('returns an object containing an array containing intersecting items from the array', function () {
			var object1 = {
				people: [
					{
						first_name: 'Isaac Lee',
						last_name: 'Morris'
					}
				]
			};

			var object2 = {
				people: [
					{
						first_name: 'Samuel',
						last_name: 'Morris'
					}
				]
			};

			var result = boardwalk.intersect([object1, object2]);

			console.log(result);
		});
	});

	describe('intersecting multiple items.', function() {
		it('returns an object containing the intersection of 3 items.', function () {
			var object1 = {
				first_name: 'Isaac Lee',
				last_name: 'Morris',
				city: 'Beaverton'
			};

			var object2 = {
				first_name: 'Samuel',
				last_name: 'Morris',
				city: 'Beaverton'
			};

			var object3 = {
				first_name: 'Samuel',
				last_name: 'Adams',
				city: 'Beaverton'
			};

			var result = boardwalk.intersect([object1, object2, object3]);

			console.log(result);

			expect(result.city).to.equal('Beaverton');
			expect(result.last_name).to.be.undefined;
		});
	});

	describe('passing in generic value', function () {
		it('should attach a value to the result if it is equal to the generic option', function () {
			var object1 = {
				first_name: 'Isaac Lee',
				last_name: 'Morris',
				city: 'Beaverton'
			};

			var object2 = {
				first_name: 'Samuel',
				last_name: 'Morris',
				city: 'Beaverton'
			};

			var object3 = {
				first_name: 'Samuel',
				last_name: 'Adams',
				city: 'Beaverton'
			};

			var result = boardwalk.intersect([object1, object2, object3], { generic: 'Adams' });

			console.log(result);

			expect(result.city).to.equal('Beaverton');
			expect(result.last_name).to.equal('Adams');
		});
	});
});

describe('resolve(path, object)', function () {

});

describe('set(path, object, value)', function () {
	it('sets a deep property on an object', function () {
		var object1 = { id: 'abc123' };

		var result = boardwalk.set('person.name.first_name', object1, 'Isaac Lee');

		console.log(result);

		expect(result).to.have.deep.property('person.name.first_name', 'Isaac Lee');
	});
});