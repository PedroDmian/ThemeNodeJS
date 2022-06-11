/* eslint-env mocha */
import chai from 'chai'
chai.should()

it('will pass', function (done) {
    let a = 1 + 1
    a.should.be.eq(2, 'This should never happens!')
    done()
})
it('will pass also', function (done) {
  let a = 2 * 2
  if(a === 4){
    done()
  }else{
    done('What??')
  }
})
