# @sealsystems/countingstream

[![CircleCI](https://circleci.com/gh/sealsystems/node-countingstream.svg?style=svg)](https://circleci.com/gh/sealsystems/node-countingstream)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/b87tp7eg07rn4jpv?svg=true)](https://ci.appveyor.com/project/Plossys/node-countingstream)

@sealsystems/countingstream counts the stream length in bytes.

## Installation

```bash
$ npm install @sealsystems/countingstream
```

## Quick start

First you need to add a reference to @sealsystems/countingstream within your application.

```javascript
const CountingStream = require('@sealsystems/countingstream');
```

Then, call the constructor function.

```javascript
const countingstream = new CountingStream();
```

CountingStream is derived from the Transform stream and can be used like any such stream. To get the number of bytes piped through, call:

```javascript
const numberOfStreamedBytes = countingstream.getCount(); // -> returns the number of bytes streamed so far
```

You can reset the counter any time.

```javascript
countingstream.resetCount();
```

It is also possible to set the counter to an arbitrary value.

```javascript
countingstream.resetCount(42);
countingstream.getCount(); // -> returns 42
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```

