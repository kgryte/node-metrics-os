/**
*
*	METRICS: OS
*
*
*	DESCRIPTION:
*		- Small utility to get system metrics.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // OS module:
		os = require( 'os' );


	// VARIABLES //

	var MAP2 = {},
		MAP1,
		KEYS,
		NUMKEYS;

	MAP1 = {
		'user': 'user',
		'nice': 'nice',
		'sys': 'system',
		'idle': 'idle',
		'irq': 'irq'
	};
	
	KEYS = Object.keys( MAP1 );
	NUMKEYS = KEYS.length;

	var key, mKey, aKey;
	for ( var i = 0; i < NUMKEYS; i++ ) {
		// Manage key mappings:
		key = KEYS[ i ];
		mKey = MAP1[ key ];
		aKey = mKey + 'Average';

		// Create a separate mapping for CPU data averaged across all CPUs:
		MAP2[ mKey ] = aKey;
	}


	// FUNCTIONS //

	/**
	* FUNCTION: getLoad()
	*	Returns the CPU load. Note: this does not work on Windows platforms.
	*
	* @returns {Object} CPU load averages for 1, 5, and 15 minutes
	*/
	function getLoad() {
		var load = os.loadavg(); // [...]
		return {
			'1m': load[ 0 ],
			'5m': load[ 1 ],
			'15m': load[ 2 ]
		};
	} // end FUNCTION getLoad()

	/**
	* FUNCTION: getMemory()
	*	Returns memory usage metrics.
	*
	* @returns {Object} memory usage metrics: `memTotal`, `memFree`, `ramUtilization`.
	*/
	function getMemory() {
		var total = os.totalmem(),
			free = os.freemem();
		return {
			'memTotal': total/1000,
			'memFree': free/1000,
			'ramUtilization': ( total-free ) / total
		};
	} // end FUNCTION getMemory()

	/**
	* FUNCTION: getCPU()
	*	Returns CPU metrics.
	*
	* @returns {Array} CPU metrics
	*/
	function getCPU() {
		var arr = os.cpus(), // [...]
			len = arr.length,
			data = new Array( len ),
			means = {},
			N = 0,
			delta,
			key, aKey, mKey,
			d, tmp,
			i, j, k;

		// Initialize the mean value for each metric...
		for ( i = 0; i < NUMKEYS; i++ ) {
			key = KEYS[ i ];
			aKey = MAP2[ MAP1[ key ] ];
			means[ aKey ] = 0;
		}
		for ( j = 0; j < len; j++ ) {
			d = arr[ j ].times;
			tmp = {};
			N += 1;
			for ( k = 0; k < NUMKEYS; k++ ) {
				// Manage key mappings:
				key = KEYS[ k ];
				mKey = MAP1[ key ];
				aKey = MAP2[ mKey ];

				// Get the individual CPU data:
				tmp[ mKey ] = d[ key ];

				// Update the mean value for this metric:
				delta = d[ key ] - means[ aKey ];
				means[ aKey ] += delta / N;
			}
			data[ j ] = tmp;
		}
		data.push( means );
		return data;
	} // end FUNCTION getCPU()


	// METRICS //

	/**
	* FUNCTION: metrics()
	*	Returns system metrics.
	*
	* @returns {Object} system metrics
	*/
	function metrics() {
		var m = {};

		// [1] Get the number of milliseconds the system has been running:
		m.uptime = os.uptime() * 1000;

		// [2] Get CPU load averages:
		m.load = getLoad();

		// [3] Get memory metrics:
		m.mem = getMemory();

		// [4] Get CPU metrics:
		m.cpu = getCPU();

		return m;
	} // end FUNCTION metrics()


	// EXPORTS //

	module.exports = metrics;

})();