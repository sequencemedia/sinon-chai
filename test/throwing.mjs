import sinon from 'sinon'
import { AssertionError, expect } from 'chai'
import { swallow } from './common.mjs'

describe('Throwing', () => {
  describe('thrown()', () => {
    it('should throw an assertion error if the spy does not throw at all', () => {
      const spy = sinon.spy(() => { /* Contents don't matter */ })

      spy()

      expect(() => {
        spy.should.have.thrown()
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.thrown()
      }).to.throw(AssertionError)
    })

    it('should not throw if the spy throws', () => {
      const spy = sinon.spy(() => {
        throw new Error()
      })

      swallow(spy)

      expect(() => {
        spy.should.have.thrown()
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.thrown()
      }).to.not.throw()
    })

    it('should not throw if the spy throws once but not the next time', () => {
      const spy = sinon.spy(() => {
        if (!(spy.callCount > 1)) {
          throw new Error()
        }
      })

      swallow(spy)
      swallow(spy)

      expect(() => {
        spy.should.have.thrown()
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.thrown()
      }).to.not.throw()
    })
  })

  describe('thrown(errorObject)', () => {
    let error = null

    beforeEach(() => {
      error = new Error('boo!')
    })

    it('should throw an assertion error if the spy does not throw at all', () => {
      const spy = sinon.spy(() => { /* Contents don't matter */ })

      spy()

      expect(() => {
        spy.should.have.thrown(error)
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.thrown(error)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error if the spy throws the wrong error', () => {
      const spy = sinon.spy(() => {
        return new Error('eek!')
      })

      swallow(spy)

      expect(() => {
        spy.should.have.thrown(error)
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.thrown(error)
      }).to.throw(AssertionError)
    })

    it('should not throw if the spy throws', () => {
      const spy = sinon.spy(() => {
        throw error
      })

      swallow(spy)

      expect(() => {
        spy.should.have.thrown(error)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.thrown(error)
      }).to.not.throw()
    })

    it('should not throw if the spy throws once but not the next time', () => {
      const spy = sinon.spy(() => {
        if (!(spy.callCount > 1)) {
          throw error
        }
      })

      swallow(spy)
      swallow(spy)

      expect(() => {
        spy.should.have.thrown(error)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.thrown(error)
      }).to.not.throw()
    })
  })

  describe('thrown(errorTypeString)', () => {
    let error = null

    beforeEach(() => {
      error = new TypeError('boo!')
    })

    it('should throw an assertion error if the spy does not throw at all', () => {
      const spy = sinon.spy(() => { /* Contents don't matter */ })

      spy()

      expect(() => {
        spy.should.have.thrown('TypeError')
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.thrown('TypeError')
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error if the spy throws the wrong type of error', () => {
      const spy = sinon.spy(() => {
        throw new Error('boo!')
      })

      swallow(spy)

      expect(() => {
        spy.should.have.thrown('TypeError')
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.thrown('TypeError')
      }).to.throw(AssertionError)
    })

    it('should not throw if the spy throws the correct type of error', () => {
      const spy = sinon.spy(() => {
        throw new TypeError('eek!')
      })

      swallow(spy)

      expect(() => {
        spy.should.have.thrown('TypeError')
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.thrown('TypeError')
      }).to.not.throw()
    })

    it('should not throw if the spy throws once but not the next time', () => {
      const spy = sinon.spy(() => {
        if (!(spy.callCount > 1)) {
          throw error
        }
      })

      swallow(spy)
      swallow(spy)

      expect(() => {
        spy.should.have.thrown('TypeError')
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.thrown('TypeError')
      }).to.not.throw()
    })
  })

  describe('always thrown', () => {
    let error = null

    beforeEach(() => {
      error = new TypeError('boo!')
    })

    it('should throw an assertion error if the spy throws once but not the next time', () => {
      const spy = sinon.spy(() => {
        if (!(spy.callCount > 1)) {
          throw error
        }
      })

      swallow(spy)
      swallow(spy)

      expect(() => {
        spy.should.have.always.thrown()
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.always.have.thrown()
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.thrown(error)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.always.have.thrown(error)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.thrown('TypeError')
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.always.have.thrown('TypeError')
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error if the spy throws the wrong error the second time', () => {
      const spy = sinon.spy(() => {
        if (spy.callCount === 1) {
          throw error
        } else {
          throw new Error()
        }
      })

      swallow(spy)
      swallow(spy)

      expect(() => {
        spy.should.have.always.thrown(error)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.always.have.thrown(error)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.thrown('TypeError')
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.always.have.thrown('TypeError')
      }).to.throw(AssertionError)
    })

    it('should not throw if the spy always throws the right error', () => {
      const spy = sinon.spy(() => {
        throw error
      })

      swallow(spy)
      swallow(spy)

      expect(() => {
        spy.should.have.always.thrown(error)
      }).to.not.throw()
      expect(() => {
        spy.should.always.have.thrown(error)
      }).to.not.throw()
      expect(() => {
        spy.should.have.always.thrown('TypeError')
      }).to.not.throw()
      expect(() => {
        spy.should.always.have.thrown('TypeError')
      }).to.not.throw()
    })
  })
})
