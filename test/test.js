
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	lib = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'metrics-os', function tests() {
	'use strict';

	// SETUP //

	var metrics = lib();


	// TESTS //

	it( 'should export a function', function test() {
		expect( lib ).to.be.a( 'function' );
	});

	it( 'should return an object with metrics', function test() {
		expect( metrics ).to.be.an( 'object' );
	});

	it( 'should return the CPU load', function test() {
		expect( metrics.load ).to.be.an( 'object' );
	});

	it( 'should return the uptime', function test() {
		expect( metrics.uptime ).to.be.a( 'number' );
	});

	it( 'should return memory metrics', function test() {
		expect( metrics.mem ).to.be.an( 'object' );
	});

	it( 'should return cpu metrics', function test() {
		expect( metrics.cpu ).to.be.an( 'array' );
	});

});