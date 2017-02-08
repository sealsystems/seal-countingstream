'use strict';

const Transform = require('stream').Transform;
const util = require('util');

const CountingStream = function (options) {
  this.streamCount = 0;

  Transform.call(this, options);
};

util.inherits(CountingStream, Transform);

/* eslint-disable no-underscore-dangle */
CountingStream.prototype._transform = function (chunk, encoding, callback) {
  this.streamCount += chunk.length;
  callback(null, chunk);
};
/* eslint-enable no-underscore-dangle */

CountingStream.prototype.resetCount = function (count) {
  this.streamCount = count || 0;
};

CountingStream.prototype.getCount = function () {
  return this.streamCount;
};

module.exports = CountingStream;
