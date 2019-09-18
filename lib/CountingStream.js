'use strict';

const { Transform } = require('stream');

class CountingStream extends Transform {
  constructor(options) {
    super(options);
    this.streamCount = 0;
  }

  _transform(chunk, encoding, callback) {
    this.streamCount += chunk.length;
    callback(null, chunk);
  }

  resetCount(count) {
    this.streamCount = count || 0;
  }

  getCount() {
    return this.streamCount;
  }
}

module.exports = CountingStream;
