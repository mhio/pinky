const chai = require('chai')
chai.use(require('chai-subset'))
const { expect } = chai
const {
  outerSettle,
  delay,
  delayFrom,
  delayTo,
  waitFor,
  map,
  mapSeries,
  mapConcurrent,
  workerAll,
  firstInSeriesWithoutError,
  firstWithoutError,
  allProps
} = require('../../dist/pinky')
const delayReturnMs = (v) => delay(v).then(() => v)
const delayReturnMsEntries = ([,v]) => {
  if (v === false) throw new Error('false')
  return delay(v).then(() => v)
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
    const vals = [30,15,1]
    const total_vals = sumArray(vals)
    const start_ts = Date.now()
    const res = await mapSeries(vals, delayReturnMs)
    expect(res).to.eql([30,15,1])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(total_vals)
  })

  it('should mapConcurrent 1 array', async function(){
    const vals = [30,15,1,29,2]
    const total_vals = sumArray(vals)
    const start_ts = Date.now()
    const res = await mapConcurrent(vals, delayReturnMs, 1)
    expect(res).to.eql(vals)
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(total_vals)
  })

  it('should mapConcurrent 2 array', async function(){
    const start_ts = Date.now()
    const res = await mapConcurrent([30,15,1,29,2], delayReturnMs, 2)
    expect(res).to.eql([30,15,1,29,2])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(31)
  })
  it('should mapConcurrent 3 array', async function(){
    const start_ts = Date.now()
    const res = await mapConcurrent([30,15,1,29,2], delayReturnMs, 3)
    expect(res).to.eql([30,15,1,29,2])
    expect(Date.now() - start_ts).to.be.greaterThanOrEqual(30)
    expect(Date.now() - start_ts).to.be.lessThan(35)
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


  it('outerSettles', async function(){
    const [ p, resolve, reject ] = outerSettle()
    expect(resolve).to.be.a('function')
    expect(reject).to.be.a('function')
    resolve(true)
    const res = await p
    expect(res).to.equal(true)
  })

})
