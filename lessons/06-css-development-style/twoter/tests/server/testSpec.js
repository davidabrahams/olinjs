// Setup our assertion library
var expect = require('chai').expect;

var index = require('../../routes/index');
//you probably don't need this file anymore

// Sample tests
describe("A test suite", function() {
	// Synchronous
	it('should use expect syntax', function() {
		expect(false).not.to.be.true;
	});
	// Async
	it('should work asynchronously', function(done) {
		setTimeout(function() {
			expect(true).to.be.true;
			done();
		}, 1000);
	});
});

// describe("index", function() {
// 	it('should have an attribute ten equal to 10', function() {
// 		expect(index.ten).to.equal(10);
// 	});
// });
