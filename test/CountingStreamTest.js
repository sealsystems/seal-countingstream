'use strict';

const Transform = require('stream').Transform;

const assert = require('assertthat');

const CountingStream = require('../lib/CountingStream');

suite('CountingStream', () => {
  let countingStream;

  setup(async () => {
    countingStream = new CountingStream();
  });

  test('is an object.', (done) => {
    assert.that(countingStream).is.ofType('object');
    assert.that(countingStream).is.instanceOf(Transform);
    assert.that(countingStream.getCount).is.ofType('function');
    assert.that(countingStream.resetCount).is.ofType('function');
    done();
  });

  test('pass data', (done) => {
    const data1 = 'hohoho';
    const data2 = 'jojojo';
    let received = '';

    countingStream.on('data', (chunk) => {
      received += chunk.toString('utf8');
    });

    countingStream.write(data1, 'utf8');
    countingStream.write(data2, 'utf8', (err2) => {
      assert.that(err2).is.falsy();
      assert.that(received).is.equalTo(data1 + data2);
      done();
    });
  });

  test('count data', (done) => {
    const writeBuf = Buffer.from('1234567890');

    // eslint-disable-next-line no-empty-function
    countingStream.on('data', () => {});

    for (let i = 0; i < 12345; i++) {
      countingStream.write(writeBuf);
    }
    assert.that(countingStream.getCount()).is.equalTo(123450);
    done();
  });

  test('reset count to default value', (done) => {
    const writeBuf = Buffer.from('1234567890');

    // eslint-disable-next-line no-empty-function
    countingStream.on('data', () => {});

    for (let i = 0; i < 5; i++) {
      countingStream.write(writeBuf);
    }
    assert.that(countingStream.getCount()).is.equalTo(50);
    countingStream.resetCount();
    assert.that(countingStream.getCount()).is.equalTo(0);
    done();
  });

  test('reset count to given value', (done) => {
    const writeBuf = Buffer.from('1234567890');

    // eslint-disable-next-line no-empty-function
    countingStream.on('data', () => {});

    for (let i = 0; i < 3; i++) {
      countingStream.write(writeBuf);
    }
    assert.that(countingStream.getCount()).is.equalTo(30);
    countingStream.resetCount(8);
    assert.that(countingStream.getCount()).is.equalTo(8);
    done();
  });
});
