import { Readable } from 'node:stream'

import {
  outerSettlePromise,
  delay,
  delayFrom,
  delayTo,
  waitFor,
  map,
  mapSeries,
  mapSeriesAsync,
  mapConcurrent,
  workerAll,
  workerAllAsync,
  firstInSeriesWithoutError,
  firstWithoutError,
  allProps
} from '../../dist/pinky.js'

const delay1Ms = (v) => delay(1).then(() => v)
const delayReturnMs = (v) => delay(v).then(() => v)
const delayReturnMsReject = (v) => {
  if (v === false) return Promise.reject(new Error('false'))
  return delay(v).then(() => v)
}
const delayReturnMsError = (v) => {
  if (v === false) throw new Error('false')
  return delayReturnMs(v)
}
const delayReturnMsEntries = ([,v]) => {
  if (v === false) throw new Error('false')
  return delayReturnMs(v)
}
const delayReturnMsAsyncIterable = (v) => {
  if (v === false) throw new Error('false')
  return delayReturnMs(v)
}
const sumArray = (arr) => arr.reduce((a, i) => a + i, 0)
const maxArray = (arr) => arr.reduce((a, i) => (i > a) ? i : a, 0)

describe('test', function(){
 
  it('should delay', async function(){
    const res = await delay(1)
    expect(res).to.be.undefined
  })
  it('should delayFrom', async function(){
    const res = await delayFrom(Date.now(), 10)
    expect(res).to.be.undefined
  })
  it('should delayFrom the past', async function(){
    const res = await delayFrom(Date.now()-10, 1)
    expect(res).to.be.undefined
  })
  it('should delayFrom the future', async function(){
    const res = await delayFrom(Date.now()+100000, 10)
    expect(res).to.be.undefined
  })
  it('should delayTo', async function(){
    const res = await delayTo(Date.now()+10)
    expect(res).to.be.undefined
  })
  it('should delayTo the past ok', async function(){
    const res = await delayTo(Date.now()-10)
    expect(res).to.be.undefined
  })
  it('should map', async function(){
    const res = await map([25,1,19,2,24], delayReturnMs)
    expect(res).to.eql([25,1,19,2,24])
  })

  it('should mapSeries', async function(){
    const values = [30,15,1]
    const total_values = sumArray(values)
    const start_ts = Date.now()
    const res = await mapSeries(values, delayReturnMs)
    expect(res).to.eql([30,15,1])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(total_values) // node timer is time traveller
  })

  it('should mapSeriesAsync', async function(){
    const values = Readable.from([30,15,1])
    const total_values = sumArray([30,15,1])
    const start_ts = Date.now()
    const res = await mapSeriesAsync(values, delayReturnMs)
    expect(res).to.eql([30,15,1])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(total_values)
  })

  it('should mapSeriesAsync', async function(){
    const values = Readable.from([30,15,1]).map(delay1Ms)
    const total_values = sumArray([30,15,1])
    const start_ts = Date.now()
    const res = await mapSeriesAsync(values, delayReturnMs)
    expect(res).to.eql([30,15,1])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(total_values)
  })

  it('should mapConcurrent 1 array', async function(){
    const values = [30,15,1,29,2]
    const total_values = sumArray(values)
    const start_ts = Date.now()
    const res = await mapConcurrent(values, delayReturnMs, 1)
    expect(res).to.eql(values)
    // seen this fail once with 75ms and once with 76ms instead of 77+. Maybe during a time adjust?
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(total_values)
  })

  it('should mapConcurrent 2 array', async function(){
    const start_ts = Date.now()
    const res = await mapConcurrent([30,15,1,29,2], delayReturnMs, 2)
    expect(res).to.eql([30,15,1,29,2])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(31)
  })
  it('should mapConcurrent 3 ascending', async function(){
    const values = [1,1,2,2,3,3,4,4,5,5,6]
    const total_values = sumArray(values)
    const start_ts = Date.now()
    const res = await mapConcurrent(values, delayReturnMs, 3)
    expect(res).to.eql(values)
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(14)
  })
  it('should mapConcurrent 3 descending', async function(){
    const values = [6,6,5,5,4,4,3,2,2,1,1]
    const total_values = sumArray(values)
    const start_ts = Date.now()
    const res = await mapConcurrent(values, delayReturnMs, 3)
    expect(res).to.eql(values)
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(13)
  })
  it('should mapConcurrent fill queue except 1', async function(){
    const values = [15,15,15,15,15,1,5,4,3,1]
    const total_values = sumArray(values)
    const start_ts = Date.now()
    const res = await mapConcurrent(values, delayReturnMs, 3)
    expect(res).to.eql(values)
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(30)
  })
  it('should mapConcurrent 2 with error', async function(){
    const start_ts = Date.now()
    try {
      const res = await mapConcurrent([5,5,false,1,1], delayReturnMsError, 2)
      expect.fail('no error')
    } catch (e) {
      expect(e.message).to.eql('false')
      expect(Date.now() - start_ts).to.be.greaterThanOrEqual(4)
    }
  })
  it('should mapConcurrent 2 with reject', async function(){
    const start_ts = Date.now()
    try {
      const res = await mapConcurrent([5,5,false,1,1], delayReturnMsReject, 2)
      expect.fail('no error')
    } catch (e) {
      expect(e.message).to.eql('false')
      expect(Date.now() - start_ts).to.be.greaterThanOrEqual(4)
    }
  })
  it('should mapConcurrent more workers than data', async function(){
    const start_ts = Date.now()
    const res = await mapConcurrent([2], delayReturnMs, 5)
    expect(res).to.eql([2])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(1)
  })
  
  it('should mapConcurrent 3 array', async function(){
    const start_ts = Date.now()
    const res = await mapConcurrent([30,15,1,29,2], delayReturnMs, 3)
    expect(res).to.eql([30,15,1,29,2])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(30)
    expect(Date.now() - start_ts).to.be.lessThan(35)
  })

  it('should mapConcurrent 7 array', async function(){
    const start_ts = Date.now()
    const values = [4,13,1,11,2,7,9,12]
    const res = await mapConcurrent(values, delayReturnMs, 7)
    expect(res).to.eql(values)
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(13) // node timer aint ms perfect :/
    expect(Date.now() - start_ts).to.be.lessThan(18) // could be flakey
  })
  it('should mapConcurrent no delay', async function(){
    const start_ts = Date.now()
    const res = await mapConcurrent([30,15,1,29,2], Promise.resolve.bind(Promise), 2)
    expect(res).to.eql([30,15,1,29,2])
  })

  it('should mapConcurrent 1 iterator', async function(){
    const res = await mapConcurrent(new Set([30,15,1,29,2]), delayReturnMs, 1)
    expect(res).to.eql([30,15,1,29,2])
  })

  it('should mapConcurrent 2 iterator', async function(){
    const res = await mapConcurrent(new Set([30,15,1,29,2]), delayReturnMs, 2)
    expect(res).to.eql([30,15,1,29,2])
  })
  it('should mapConcurrent 3 iterator', async function(){
    const res = await mapConcurrent(new Set([30,15,1,29,2]), delayReturnMs, 3)
    expect(res).to.eql([30,15,1,29,2])
  })

  it('should worker workers 2', async function(){
    const res = await workerAll(2, [25,20,5,1,35].entries(), delayReturnMsEntries)
    expect(res).to.containSubset([25,20,5,1,35])
  })

  it('should worker workers 3', async function(){
    const res = await workerAll(3, [10,10,10,1,2,3].entries(), delayReturnMsEntries)
    expect(res).to.containSubset([10,10,10,1,2,3])
  })

  it('should bail workers', async function(){
    try {
      await workerAll(3, [5,5,5,false,2,3].entries(), delayReturnMsEntries)
    }
    catch (error){
      expect(error.message).to.eql('false')
    }
  })

  it('should workerAllAsync plain iterable workers 2', async function(){
    const iterable = [25,20,5,1,35].entries()
    const res = await workerAllAsync(2, iterable, delayReturnMsEntries)
    expect(res).to.containSubset([25,20,5,1,35])
  })

  it('should workerAllAsync async workers 2', async function(){
    const async_iterable = Readable.from([25,20,5,1,35]).map(delay1Ms)
    const res = await workerAllAsync(2, async_iterable, delayReturnMsAsyncIterable)
    expect(res).to.containSubset([25,20,5,1,35])
  })

  it('should workerAllAsync async workers 3', async function(){
    const async_iterable = Readable.from([10,10,10,1,2,3])
    const res = await workerAllAsync(3, async_iterable, delayReturnMsAsyncIterable)
    expect(res).to.containSubset([10,10,10,1,2,3])
  })

  it('should workerAllAsync async more workers than data', async function(){
    const async_iterable = Readable.from([10,9,8])
    const res = await workerAllAsync(6, async_iterable, delayReturnMsAsyncIterable)
    expect(res).to.containSubset([10,9,8])
  })

  it('should bail async workers', async function(){
    const async_iterable = Readable.from([5,5,5,false,2,3])
    try {
      await workerAllAsync(3, async_iterable, delayReturnMsAsyncIterable)
    }
    catch (error){
      expect(error.message).to.eql('false')
    }
  })

  it('should return first with ok firstWithoutError', async function(){
    const res = await firstWithoutError([50,5,1], delayReturnMs)
    expect(res).to.eql(50)
  })

  it('should skip first error on firstWithoutError', async function(){
    const res = await firstWithoutError([Promise.reject('no'),5,1], delayReturnMs)
    expect(res).to.eql(5)
  })
  it('should return first in series without error', async function(){
    const res = await firstInSeriesWithoutError([5,5,1])
    expect(res).to.eql(5)
  })
  it('should return first in series without error', async function(){
    const res = await firstInSeriesWithoutError([Promise.reject(),5,1])
    expect(res).to.eql(5)
  })
  it('should return first in series without error', async function(){
    try { 
      await firstInSeriesWithoutError([Promise.reject('no'),Promise.reject('nope')])
      expect.fail('Should have thrown')
    } catch (err) {
      expect(err.message).to.equal('Series Errors')
      expect(err.errors).to.be.an('array')
      expect(err.errors).to.have.lengthOf(2)
    }
  })
  
  
  it('allProps', async function(){
    const res = await allProps({ 1:1, 2:Promise.resolve(2), 3:delayReturnMs(3) })
    expect(res).to.eql({1:1, 2:2, 3:3})
  })

  it('waitFor', async function(){
    let state = false
    setTimeout(() => state = true, 25) 
    const res = await waitFor(250, () => state === true, { wait_ms: 10 })
    expect(res).to.containSubset({ count: 2 })
  })
  it('waitFor timeout', async function(){
    const state = false
    try {
      await waitFor(10, () => state === true, { wait_ms: 5 })
      expect.fail('Should have errored')
    } catch (err) {
      expect(err.message).to.match(/Timeout/)
      expect(err.details).to.be.an('object')
      expect(err.details).to.containSubset({
        wait_ms: 5,
        label: 'condition',
        timeout_ms: 10,
      })
      expect(err.details.condition_fn).to.be.a('function')
    }
  })


  it('outerSettle returns things', async function(){
    const { promise, resolve, reject } = outerSettlePromise()
    expect(resolve).to.be.a('function')
    expect(reject).to.be.a('function')
  })
  it('outerSettle resolves things', async function(){
    const { promise, resolve, reject } = outerSettlePromise()
    resolve(true)
    expect(await promise).to.equal(true)
  })
  it('outerSettle rejects things', async function(){
    const { promise, resolve, reject } = outerSettlePromise()
    try {
      reject(new Error('gahhhhh'))
      await promise
      expect.fail('should not get here')
    }
    catch (error){
      expect(error.message).to.equal('gahhhhh')
    }
  })
})
