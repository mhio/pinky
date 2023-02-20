import chai from 'chai'
import chaiSubset from 'chai-subset'

chai.use(chaiSubset)
const { expect } = chai

global.chai = chai
global.expect = expect
export { chai, expect }
