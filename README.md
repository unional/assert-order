# assert-order

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/unional/assert-order.svg)](https://greenkeeper.io/)

...sometimes we do need to assert code are executed in certain order.

This is the library for that.

## Usage

### order.once(step: number)

Asserts the step `step` executed once.

```ts
import { AssertOrder } from 'assert-order'

const o = new AssertOrder()
function foo() {
  o.once(1)
}

foo()
foo() // throws
```

```ts
import { AssertOrder } from 'assert-order'

const o = new AssertOrder()
function foo() {
  o.once(1)
}

function boo() {
  o.once(2)
}

foo()
boo()
```

### order.atLeastOnce(step: number)

Assert step `step` have executed at least once.

```ts
import { AssertOrder } from 'assert-order'

const o = new AssertOrder()

for (let i = 0; i < 10; i++)
  o.atLeastOnce(1)


o.once(2)
```

### order.exactly(step: number, times: number)

Asserts the step `step` executed exactly n times

```ts
import { AssertOrder } from 'assert-order'

const o = new AssertOrder()

for (let i = 0; i < 4; i++)
  o.exactly(1, 3) // throws at i === 3
```

### order.any(steps: number[])

Asserts any of the steps `steps` executed.

```ts
import { AssertOrder } from 'assert-order'

const o = new AssertOrder()

for (let i = 1; i <= 4; i++) {
  if (i % 2)
    o.any([1, 3])
  else
    o.any([2, 4])
}
```

There are more methods available. Use TypeScript to discover them!

## Contribute

```sh
# right after fork
npm install

# begin making changes
git checkout -b <branch>
npm run watch

# edit `webpack.config.dev.js` to exclude dependencies for the global build.

# after making change(s)
git commit -m "<commit message>"
git push

# create PR
```

## Npm Commands

There are a few useful commands you can use during development.

```sh
# Run tests (and lint) automatically whenever you save a file.
npm run watch

# Run tests with coverage stats (but won't fail you if coverage does not meet criteria)
npm run test

# Manually verify the project.
# This will be ran during 'npm preversion' so you normally don't need to run this yourself.
npm run verify

# Build the project.
# You normally don't need to do this.
npm run build

# Run tslint
# You normally don't need to do this as `npm run watch` and `npm version` will automatically run lint for you.
npm run lint
```

Generated by `generator-unional@0.0.1`

[npm-image]: https://img.shields.io/npm/v/assert-order.svg?style=flat
[npm-url]: https://npmjs.org/package/assert-order
[downloads-image]: https://img.shields.io/npm/dm/assert-order.svg?style=flat
[downloads-url]: https://npmjs.org/package/assert-order
[travis-image]: https://img.shields.io/travis/unional/assert-order/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/assert-order?branch=master
[coveralls-image]: https://coveralls.io/repos/github/unional/assert-order/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/assert-order
