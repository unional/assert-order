import { test } from 'ava'

import { assertron, InvalidUsage, NotRejected, NotThrown, ReturnNotRejected, UnexpectedError } from '.'

test('assertron.throws() throws if input not function or promise', t => {
  t.throws(() => assertron.throws(0 as any), err => err instanceof InvalidUsage)
  t.throws(() => assertron.throws(true as any), err => err instanceof InvalidUsage)
  t.throws(() => assertron.throws('...' as any), err => err instanceof InvalidUsage)
  t.throws(() => assertron.throws(/foo/ as any), err => err instanceof InvalidUsage)
})

test('assertron.throws() throws NotRejected for resolved promise', t => {
  return t.throws(
    assertron.throws(Promise.resolve('ok')),
    err => err instanceof NotRejected && err.value === 'ok')
})

test('assertron.throws() passes with rejected promise', () => {
  return assertron.throws(Promise.reject('no'))
})

test('assertron.throws() passes with rejected promise passing validator', () => {
  return assertron.throws(Promise.reject('no'), err => err === 'no')
})

test('assertron.throws() throws with rejected promise failing validator', t => {
  return t.throws(
    assertron.throws(Promise.reject('no'), err => err !== 'no'),
    err => err instanceof UnexpectedError && err.err === 'no')
})

test('assertron.throws() passes with throwing function', () => {
  assertron.throws(() => { throw new Error('foo') })
})

test('assertron.throws() throws if function does not', t => {
  t.throws(() => assertron.throws(
    () => { return 'foo' },
    err => err instanceof NotThrown && err.value === 'foo'))
})

test('assertron.throws() throws if function returns resolved promise', t => {
  return t.throws(
    assertron.throws(() => { return Promise.resolve('ok') }),
    err => err instanceof ReturnNotRejected && err.value === 'ok')
})

test('assertron.throws() pass if function returns rejected promise', () => {
  return assertron.throws(() => { return Promise.reject('ok') })
})

test('assertron.throws() pass if function returns rejected promise passing valdation', () => {
  return assertron.throws(
    () => { return Promise.reject('ok') },
    err => err === 'ok')
})

test('assertron.throws() throws if function returns rejected promise not passing valdation', t => {
  return t.throws(
    assertron.throws(() => { return Promise.reject('ok') }, err => err !== 'ok'),
    err => err instanceof UnexpectedError && err.err === 'ok')
})