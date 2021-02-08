const chai = require('chai')
chai.use(require('chai-subset'))
const { expect } = chai
const {
  outerSettle,
  delay,
  waitFor,
  map,
  mapSeries,
  workerAll,
  firstInSeriesWithoutError,
  firstWithoutError,
  allProps,
  AggregateError,
} = require('../../')

describe('int::test', function(){

  it('should map', async function(){
    const res = await map([25,1,19,2,24], async (ms) => delay(ms).then(()=> ms))
    expect(res).to.eql([25,1,19,2,24])
  })

  it('should have an AggregateError too', async function(){
    const res = new AggregateError([new Error('a'), new Error('b')])
    expect(res).to.be.ok
  })

})
