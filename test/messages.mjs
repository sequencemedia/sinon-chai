import sinon from 'sinon'
import { expect } from 'chai'
import { swallow } from './common.mjs'

describe('Messages', () => {
  describe('about call count', () => {
    it('should be correct for the base cases', () => {
      const spy = sinon.spy()

      expect(() => {
        spy.should.have.been.called
      }).to.throw('expected spy to have been called at least once, but it was never called')
      expect(() => {
        spy.should.have.been.calledOnce
      }).to.throw('expected spy to have been called exactly once, but it was called 0 times')
      expect(() => {
        spy.should.have.been.calledTwice
      }).to.throw('expected spy to have been called exactly twice, but it was called 0 times')
      expect(() => {
        spy.should.have.been.calledThrice
      }).to.throw('expected spy to have been called exactly thrice, but it was called 0 times')

      expect(() => {
        spy.should.have.callCount(1)
      }).to.throw('expected spy to have been called exactly \'once\', but it was called 0 times')
      expect(() => {
        spy.should.have.callCount(4)
      }).to.throw('expected spy to have been called exactly \'4 times\', but it was called 0 times')

      expect(() => {
        spy.should.have.been.calledOnceWith()
      }).to.throw('expected spy to have been called exactly once with arguments')
      expect(() => {
        spy.should.have.been.calledOnceWithExactly()
      }).to.throw('expected spy to have been called exactly once with exact arguments')
    })

    it('should be correct for the negated cases', () => {
      const calledOnce = sinon.spy()
      const calledTwice = sinon.spy()
      const calledThrice = sinon.spy()
      const calledFourTimes = sinon.spy()

      calledOnce()
      calledTwice()
      calledTwice()
      calledThrice()
      calledThrice()
      calledThrice()
      calledFourTimes()
      calledFourTimes()
      calledFourTimes()
      calledFourTimes()

      expect(() => {
        calledOnce.should.not.have.been.called
      }).to.throw('expected spy to not have been called')

      expect(() => {
        calledOnce.should.not.have.been.calledOnce
      }).to.throw('expected spy to not have been called exactly once')

      expect(() => {
        calledTwice.should.not.have.been.calledTwice
      }).to.throw('expected spy to not have been called exactly twice')

      expect(() => {
        calledThrice.should.not.have.been.calledThrice
      }).to.throw('expected spy to not have been called exactly thrice')

      expect(() => {
        calledOnce.should.not.have.callCount(1)
      }).to.throw('expected spy to not have been called exactly \'once\'')

      expect(() => {
        calledFourTimes.should.not.have.callCount(4)
      }).to.throw('expected spy to not have been called exactly \'4 times\'')
    })
  })

  describe('about call order', () => {
    it('should be correct for the base cases', () => {
      const spyA = sinon.spy()
      const spyB = sinon.spy()

      spyA.displayName = 'spyA'
      spyB.displayName = 'spyB'

      expect(() => {
        spyA.should.have.been.calledBefore(spyB)
      }).to.throw('expected spyA to have been called before [Function]')

      if (spyA.calledImmediatelyBefore) {
        expect(() => {
          spyA.should.have.been.calledImmediatelyBefore(spyB)
        }).to.throw('expected spyA to have been called immediately before [Function]')
      }

      expect(() => {
        spyB.should.have.been.calledAfter(spyA)
      }).to.throw('expected spyB to have been called after [Function]')

      if (spyB.calledImmediatelyAfter) {
        expect(() => {
          spyB.should.have.been.calledImmediatelyAfter(spyA)
        }).to.throw('expected spyB to have been called immediately after [Function]')
      }
    })

    it('should be correct for the negated cases', () => {
      const spyA = sinon.spy()
      const spyB = sinon.spy()

      spyA.displayName = 'spyA'
      spyB.displayName = 'spyB'

      spyA()
      spyB()

      expect(() => {
        spyA.should.not.have.been.calledBefore(spyB)
      }).to.throw('expected spyA to not have been called before [Function]')

      if (spyA.calledImmediatelyBefore) {
        expect(() => {
          spyA.should.not.have.been.calledImmediatelyBefore(spyB)
        }).to.throw('expected spyA to not have been called immediately before [Function]')
      }

      expect(() => {
        spyB.should.not.have.been.calledAfter(spyA)
      }).to.throw('expected spyB to not have been called after [Function]')

      if (spyB.calledImmediatelyAfter) {
        expect(() => {
          spyB.should.not.have.been.calledImmediatelyAfter(spyA)
        }).to.throw('expected spyB to not have been called immediately after [Function]')
      }
    })
  })

  describe('about call context', () => {
    it('should be correct for the basic case', () => {
      const spy = sinon.spy()
      const context = {}
      const badContext = { x: 'y' }

      spy.call(badContext)

      const expected = 'expected spy to have been called with {} as this, but it was called with ' +
                           spy.printf('%t') + ' instead'
      expect(() => {
        spy.should.have.been.calledOn(context)
      }).to.throw(expected)
      expect(() => {
        spy.getCall(0).should.have.been.calledOn(context)
      }).to.throw(expected)
    })

    it('should be correct for the negated case', () => {
      const spy = sinon.spy()
      const context = {}

      spy.call(context)

      const expected = 'expected spy to not have been called with {} as this'
      expect(() => {
        spy.should.not.have.been.calledOn(context)
      }).to.throw(expected)
      expect(() => {
        spy.getCall(0).should.not.have.been.calledOn(context)
      }).to.throw(expected)
    })

    it('should be correct for the always case', () => {
      const spy = sinon.spy()
      const context = {}
      const badContext = { x: 'y' }

      spy.call(badContext)

      const expected = 'expected spy to always have been called with {} as this, but it was called with ' +
                           spy.printf('%t') + ' instead'
      expect(() => {
        spy.should.always.have.been.calledOn(context)
      }).to.throw(expected)
    })
  })

  describe('about calling with new', () => {
    /* eslint-disable new-cap, no-new */
    it('should be correct for the basic case', () => {
      const spy = sinon.spy()

      spy()

      const expected = 'expected spy to have been called with new'
      expect(() => {
        spy.should.have.been.calledWithNew
      }).to.throw(expected)
      expect(() => {
        spy.getCall(0).should.have.been.calledWithNew
      }).to.throw(expected)
    })

    it('should be correct for the negated case', () => {
      const spy = sinon.spy()

      new spy()

      const expected = 'expected spy to not have been called with new'
      expect(() => {
        spy.should.not.have.been.calledWithNew
      }).to.throw(expected)
      expect(() => {
        spy.getCall(0).should.not.have.been.calledWithNew
      }).to.throw(expected)
    })

    it('should be correct for the always case', () => {
      const spy = sinon.spy()

      new spy()
      spy()

      const expected = 'expected spy to always have been called with new'
      expect(() => {
        spy.should.always.have.been.calledWithNew
      }).to.throw(expected)
    })
    /* eslint-enable new-cap, no-new */
  })

  describe('about call arguments', () => {
    it('should be correct for the basic cases', () => {
      const spy = sinon.spy()

      spy(1, 2, 3)

      expect(() => {
        spy.should.have.been.calledWith('a', 'b', 'c')
      }).to.throw('expected spy to have been called with arguments \'a\', \'b\', \'c\'')
      expect(() => {
        spy.should.have.been.calledWithExactly('a', 'b', 'c')
      }).to.throw('expected spy to have been called with exact arguments \'a\', \'b\', \'c\'')
      expect(() => {
        spy.should.have.been.calledWithMatch(sinon.match('foo'))
      }).to.throw('expected spy to have been called with arguments matching { test: [Function], message: \'match("foo")\' }')
      expect(() => {
        spy.should.have.been.calledOnceWith('a', 'b', 'c')
      }).to.throw('expected spy to have been called exactly once with arguments \'a\', \'b\', \'c\'')
      expect(() => {
        spy.should.have.been.calledOnceWithExactly('a', 'b', 'c')
      }).to.throw('expected spy to have been called exactly once with exact arguments \'a\', \'b\', \'c\'')

      expect(() => {
        spy.getCall(0).should.have.been.calledWith('a', 'b', 'c')
      }).to.throw('expected spy to have been called with arguments \'a\', \'b\', \'c\'')
      expect(() => {
        spy.getCall(0).should.have.been.calledWithExactly('a', 'b', 'c')
      }).to.throw('expected spy to have been called with exact arguments \'a\', \'b\', \'c\'')
      expect(() => {
        spy.getCall(0).should.have.been.calledWithMatch(sinon.match('foo'))
      }).to.throw('expected spy to have been called with arguments matching { test: [Function], message: \'match("foo")\' }')
    })

    it('should be correct for the negated cases', () => {
      const spy = sinon.spy()

      spy(1, 2, 3)

      expect(() => {
        spy.should.not.have.been.calledWith(1, 2, 3)
      }).to.throw('expected spy to not have been called with arguments 1, 2, 3')
      expect(() => {
        spy.should.not.have.been.calledWithExactly(1, 2, 3)
      }).to.throw('expected spy to not have been called with exact arguments 1, 2, 3')
      expect(() => {
        spy.should.not.have.been.calledWithMatch(sinon.match(1))
      }).to.throw('expected spy to not have been called with arguments matching { test: [Function], message: \'match(1)\' }')
      expect(() => {
        spy.should.not.have.been.calledOnceWith(1, 2, 3)
      }).to.throw('expected spy to not have been called exactly once with arguments 1, 2, 3')
      expect(() => {
        spy.should.not.have.been.calledOnceWithExactly(1, 2, 3)
      }).to.throw('expected spy to not have been called exactly once with exact arguments 1, 2, 3')

      expect(() => {
        spy.getCall(0).should.not.have.been.calledWith(1, 2, 3)
      }).to.throw('expected spy to not have been called with arguments 1, 2, 3')
      expect(() => {
        spy.getCall(0).should.not.have.been.calledWithExactly(1, 2, 3)
      }).to.throw('expected spy to not have been called with exact arguments 1, 2, 3')
      expect(() => {
        spy.getCall(0).should.not.have.been.calledWithMatch(sinon.match(1))
      }).to.throw('expected spy to not have been called with arguments matching { test: [Function], message: \'match(1)\' }')
    })

    it('should be correct for the always cases', () => {
      const spy = sinon.spy()

      spy(1, 2, 3)
      spy('a', 'b', 'c')

      const expected = /expected spy to always have been called with arguments 1, 2, 3/
      expect(() => {
        spy.should.always.have.been.calledWith(1, 2, 3)
      }).to.throw(expected)

      const expectedExactly = /expected spy to always have been called with exact arguments 1, 2, 3/
      expect(() => {
        spy.should.always.have.been.calledWithExactly(1, 2, 3)
      }).to.throw(expectedExactly)

      const expectedMatch = /expected spy to always have been called with arguments matching { test: \[Function\], message: 'match\(1\)' }/
      expect(() => {
        spy.should.always.have.been.calledWithMatch(sinon.match(1))
      }).to.throw(expectedMatch)

      const expectedOnce = /expected spy to have been called exactly once with arguments 1, 2, 3/
      expect(() => {
        spy.should.always.have.been.calledOnceWith(1, 2, 3)
      }).to.throw(expectedOnce)

      const expectedExactlyOnce = /expected spy to have been called exactly once with exact arguments 1, 2, 3/
      expect(() => {
        spy.should.always.have.been.calledOnceWithExactly(1, 2, 3)
      }).to.throw(expectedExactlyOnce)

      spy.resetHistory()
      spy(1, 2, 3)
      spy(1, 2, 3)

      expect(() => {
        spy.should.always.have.been.calledOnceWith(1, 2, 3)
      }).to.throw(expectedOnce)

      expect(() => {
        spy.should.always.have.been.calledOnceWithExactly(1, 2, 3)
      }).to.throw(expectedExactlyOnce)
    })
  })

  describe('about returning', () => {
    it('should be correct for the basic case', () => {
      const spy = sinon.spy(() => {
        return 1
      })

      spy()

      expect(() => {
        spy.should.have.returned(2)
      }).to.throw('expected spy to have returned 2')
      expect(() => {
        spy.getCall(0).should.have.returned(2)
      }).to.throw('expected spy to have returned 2')
    })

    it('should be correct for the negated case', () => {
      const spy = sinon.spy(() => {
        return 1
      })

      spy()

      expect(() => {
        spy.should.not.have.returned(1)
      }).to.throw('expected spy to not have returned 1')
      expect(() => {
        spy.getCall(0).should.not.have.returned(1)
      }).to.throw('expected spy to not have returned 1')
    })

    it('should be correct for the always case', () => {
      const spy = sinon.spy(() => {
        return 1
      })

      spy()

      expect(() => {
        spy.should.always.have.returned(2)
      }).to.throw('expected spy to always have returned 2')
    })
  })

  describe('about throwing', () => {
    it('should be correct for the basic cases', () => {
      const spy = sinon.spy()
      const throwingSpy = sinon.spy(() => {
        throw new Error()
      })

      spy()
      swallow(throwingSpy)

      expect(() => {
        spy.should.have.thrown()
      }).to.throw('expected spy to have thrown')
      expect(() => {
        spy.getCall(0).should.have.thrown()
      }).to.throw('expected spy to have thrown')

      expect(() => {
        throwingSpy.should.have.thrown('TypeError')
      }).to.throw('expected spy to have thrown \'TypeError\'')
      expect(() => {
        throwingSpy.getCall(0).should.have.thrown('TypeError')
      }).to.throw('expected spy to have thrown \'TypeError\'')

      expect(() => {
        throwingSpy.should.have.thrown({ message: 'x' })
      }).to.throw('expected spy to have thrown { message: \'x\' }')
      expect(() => {
        throwingSpy.getCall(0).should.have.thrown({ message: 'x' })
      }).to.throw('expected spy to have thrown { message: \'x\' }')
    })

    it('should be correct for the negated cases', () => {
      const error = new Error('boo!')
      const spy = sinon.spy(() => {
        throw error
      })

      swallow(spy)

      expect(() => {
        spy.should.not.have.thrown()
      }).to.throw('expected spy to not have thrown')
      expect(() => {
        spy.getCall(0).should.not.have.thrown()
      }).to.throw('expected spy to not have thrown')

      expect(() => {
        spy.should.not.have.thrown('Error')
      }).to.throw('expected spy to not have thrown \'Error\'')
      expect(() => {
        spy.getCall(0).should.not.have.thrown('Error')
      }).to.throw('expected spy to not have thrown \'Error\'')

      expect(() => {
        spy.should.not.have.thrown(error)
      }).to.throw('expected spy to not have thrown [Error: boo!]')
      expect(() => {
        spy.getCall(0).should.not.have.thrown(error)
      }).to.throw('expected spy to not have thrown [Error: boo!]')
    })

    it('should be correct for the always cases', () => {
      const spy = sinon.spy()
      const throwingSpy = sinon.spy(() => {
        throw new Error()
      })

      spy()
      swallow(throwingSpy)

      expect(() => {
        spy.should.have.always.thrown()
      }).to.throw('expected spy to always have thrown')

      expect(() => {
        throwingSpy.should.have.always.thrown('TypeError')
      }).to.throw('expected spy to always have thrown \'TypeError\'')

      expect(() => {
        throwingSpy.should.have.always.thrown({ message: 'x' })
      }).to.throw('expected spy to always have thrown { message: \'x\' }')
    })
  })

  describe('when used on a non-spy/non-call', () => {
    function notSpy () {
      // Contents don't matter
    }

    it('should be informative for properties', () => {
      expect(() => {
        notSpy.should.have.been.called
      }).to.throw(TypeError, /not a spy/)
    })

    it('should be informative for methods', () => {
      expect(() => {
        notSpy.should.have.been.calledWith('foo')
      }).to.throw(TypeError, /not a spy/)
    })
  })

  it('should not trigger getters for passing assertions', () => {
    const obj = {}
    let getterCalled = false
    Object.defineProperty(obj, 'getter', {
      get: () => {
        getterCalled = true
      },
      enumerable: true
    })

    const spy = sinon.spy()

    spy(obj)

    spy.should.have.been.calledWith(obj)

    expect(getterCalled).to.be.false
  })
})
