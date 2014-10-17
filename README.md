OS Metrics
==========
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Utility to get system metrics.


## Installation

For use in Node.js,

``` bash
$ npm install metrics-os
```

## Usage

The module exports a single method, which returns an `object` containing `uptime`, `load`, `mem`, and `cpu` metrics. To use the utility,

``` javascript
var getMetrics = require( 'metrics-os' ),
	metrics = getMetrics();
```

The following is an example metrics output...

``` javascript
{
	"uptime": 218091000,
	"load": {
		"1m": 1.443359375,
		"5m": 1.58203125,
		"15m": 1.93359375
	},
	"mem": {
		"memTotal": 8589934.592,
		"memFree": 230801.408,
		"ramUtilization": 0.9731311798095703
	},
	"cpu": [
		{
			"user": 16288640,
			"nice": 0,
			"system": 7832180,
			"idle": 98866460,
			"irq": 0
		},
		{
			"user": 7631040,
			"nice": 0,
			"system": 2386640,
			"idle": 112967740,
			"irq": 0
		},
		{
			"user": 14059800,
			"nice": 0,
			"system": 5183440,
			"idle": 103742200,
			"irq": 0
		},
		{
			"user": 7632010,
			"nice": 0,
			"system": 2324990,
			"idle": 113028390,
			"irq": 0
		},
		{
			"userAverage": 11402872.5,
			"niceAverage": 0, 
			"systemAverage": 4431812.5,
			"idleAverage": 107151197.5,
			"irqAverage": 0
		}
	]
}
```



### Metrics

The following metrics are reported...


#### [uptime](http://doc-metrix.github.io/general/)

The number of milliseconds since the last system reboot. In contrast to [`os.uptime()`](http://nodejs.org/api/os.html#os_os_uptime), the `uptime` reported by this utility is in `milliseconds` so as to match the units for CPU metrics (`idle`, `user`, `system`, `nice`, `iqr`).


#### [load.1m](http://doc-metrix.github.io/general/)

The average number of jobs in the run queue (state R) or waiting for disk I/O (state D) over the past minute.


#### [load.5m](http://doc-metrix.github.io/general/)

The average number of jobs in the run queue (state R) or waiting for disk I/O (state D) over the past 5 minutes.


#### [load.15m](http://doc-metrix.github.io/general/)

The average number of jobs in the run queue (state R) or waiting for disk I/O (state D) over the past 15 minutes.


#### [mem.memTotal](http://doc-metrix.github.io/memory/)

The total amount of usable RAM. This metric is reported in `kilobytes`.


#### [mem.memFree](http://doc-metrix.github.io/memory/)

The total mount of free RAM. This metric is reported in `kilobytes`.


#### [mem.ramUtilization](http://doc-metrix.github.io/memory/)

The decimal percentage of RAM being used.


#### [cpu.user](https://doc-metrix.github.io/cpu/)

Number of milliseconds a CPU has spent in `user` mode.


#### [cpu.system](https://doc-metrix.github.io/cpu/)

Number of milliseconds a CPU has spent in `kernel` mode.


#### [cpu.idle](https://doc-metrix.github.io/cpu/)

Number of milliseconds a CPU has spent idle.


#### [cpu.nice](https://doc-metrix.github.io/cpu/)

Number of milliseconds a CPU has spent in `user` mode and had a positive `nice` value (executed tasks with low priority).


#### [cpu.iqr](https://doc-metrix.github.io/cpu/)

Number of milliseconds spent addressing hardware interrupts.


#### [cpu.&lt;metric&gt;Average](https://doc-metrix.github.io/cpu/)

All metrics with the suffix `Average` are the mean values calculated across all CPUs.




## Examples

``` javascript
var getMetrics = require( 'metrics-os' );

for ( var i = 0; i < 10; i++ ) {
	setTimeout( onTimeout, 1000*i );
}

function onTimeout() {
	JSON.stringify( getMetrics() );
}
```

To run an example from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

1. 	As stated in the Node.js [documentation](http://nodejs.org/api/os.html#os_os_loadavg), `loadavg` is __not__ supported on Windows platforms.

2. 	Note that the length of the CPU metric `array` is __one more than__ the number of CPUs.

3. 	The metric naming scheme follows the conventions set forth in [doc-metrix](https://github.com/doc-metrix).



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```



## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/metrics-os.svg
[npm-url]: https://npmjs.org/package/metrics-os

[travis-image]: http://img.shields.io/travis/kgryte/node-metrics-os/master.svg
[travis-url]: https://travis-ci.org/kgryte/node-metrics-os

[coveralls-image]: https://img.shields.io/coveralls/kgryte/node-metrics-os/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/node-metrics-os?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/node-metrics-os.svg
[dependencies-url]: https://david-dm.org/kgryte/node-metrics-os

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/node-metrics-os.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/node-metrics-os

[github-issues-image]: http://img.shields.io/github/issues/kgryte/node-metrics-os.svg
[github-issues-url]: https://github.com/kgryte/node-metrics-os/issues