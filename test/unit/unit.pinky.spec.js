const chai = require('chai')
chai.use(require('chai-subset'))
const { expect } = chai
const { delay, waitFor, map, mapSeries, workerAll, firstWithoutError, allProps } = require('../../pinky')
const delayReturnMs = (v) => delay(v).then(() => v)
const delayReturnMsEntries = ([i,v]) => {
  if (v === false) throw new Error('false')
  return delay(v).then(() => v)
}

describe('test', function(){

  it('should map', async function(){
    const res = await map([25,1,19,2,24], delayReturnMs)
    expect(res).to.eql([25,1,19,2,24])
  })

  it('should mapSeries', async function(){
    const res = await mapSeries([30,15,1], delayReturnMs)
    expect(res).to.eql([30,15,1])
  })

  it('should worker workers', async function(){
    const res = await workerAll(2, [25,20,5,1,35].entries(), delayReturnMsEntries)
    expect(res).to.containSubset([25,20,5,1,35])
  })

  it('should worker workers', async function(){
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
  
  it('allProps', async function(){
    const res = await allProps({ 1:1, 2:Promise.resolve(2), 3:delayReturnMs(3) })
    expect(res).to.eql({1:1, 2:2, 3:3})
  })

  it('waitsFor', async function(){
    let state = false
    setTimeout(() => state = true, 25) 
    const res = await waitFor(250, () => state === true, { wait_ms: 10 })
    expect(res).to.containSubset({ count: 2 })
  })
})
