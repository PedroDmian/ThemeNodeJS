/* eslint-env mocha */
import mocha from 'mocha'
import chai from 'chai'
chai.should()

function importTest(name: string, path: string) {
  describe(name, function () {
    require(path)
  })
}

describe('Test MODULE NAME', function () {
  describe('Test EVERYTHING!!!', function() {
    importTest('Brief descript of the file and the tests inside', './folder1/test1.test')
  })

  describe('Test Other things also', function() {
  })
  
  describe('Test last things', function() {
  })

  describe('Forgetting any other test?', function() {
  })
  
})