import sinon from 'sinon'
import { AssertionError, expect } from 'chai'

describe('Call arguments', () => {
  let spy = null
  let arg1 = null
  let arg2 = null
  let arg3 = null
  let arg4 = null
  let notArg = null
  let any = null

  beforeEach(() => {
    spy = sinon.spy()
    arg1 = 'A'
    arg2 = 'B'
    arg3 = { D: 'E' }
    arg4 = { D: { E: { E: 'P' } } }
    notArg = 'C'
    any = sinon.match.any
  })

  describe('calledWith', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.have.been.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.been.calledWith(arg1, arg2)
      }).to.not.throw()
    })

    it('should not throw when the spy is called with the correct arguments and more', () => {
      spy(arg1, arg2, notArg)

      expect(() => {
        spy.should.have.been.calledWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.been.calledWith(arg1, arg2)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.have.been.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.been.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with incorrect arguments but then correct ones', () => {
      spy(notArg, arg1)
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.getCall(1).should.have.been.calledWith(arg1, arg2)
      }).to.not.throw()
    })

    it('should handle objects in arguments', () => {
      spy(arg1, arg3)
      const _arg3 = JSON.parse(JSON.stringify(arg3))

      expect(() => {
        spy.should.have.been.calledWith(arg1, _arg3)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.been.calledWith(arg1, _arg3)
      }).to.not.throw()
    })

    it('should handle deep objects in arguments', () => {
      spy(arg1, arg4)
      const _arg4 = JSON.parse(JSON.stringify(arg4))

      expect(() => {
        spy.should.have.been.calledWith(arg1, _arg4)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.been.calledWith(arg1, _arg4)
      }).to.not.throw()
    })
  })

  describe('always calledWith', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.always.have.been.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.always.have.been.calledWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.always.been.calledWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.been.always.calledWith(arg1, arg2)
      }).to.not.throw()
    })

    it('should not throw when the spy is called with the correct arguments and more', () => {
      spy(arg1, arg2, notArg)

      expect(() => {
        spy.should.always.have.been.calledWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.always.been.calledWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.been.always.calledWith(arg1, arg2)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.always.have.been.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called with incorrect arguments but then correct ones',
      () => {
        spy(notArg, arg1)
        spy(arg1, arg2)

        expect(() => {
          spy.should.always.have.been.calledWith(arg1, arg2)
        }).to.throw(AssertionError)
        expect(() => {
          spy.should.have.always.been.calledWith(arg1, arg2)
        }).to.throw(AssertionError)
        expect(() => {
          spy.should.have.been.always.calledWith(arg1, arg2)
        }).to.throw(AssertionError)
      })
  })

  describe('calledOnceWith', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.have.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called once with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledOnceWith(arg1, arg2)
      }).to.not.throw()
    })

    it('should not throw when the spy is called once with the correct arguments and more', () => {
      spy(arg1, arg2, notArg)

      expect(() => {
        spy.should.have.been.calledOnceWith(arg1, arg2)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called more than once', () => {
      spy(arg2, arg2)
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called once with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.have.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should handle objects in arguments', () => {
      spy(arg1, arg3)
      const _arg3 = JSON.parse(JSON.stringify(arg3))

      expect(() => {
        spy.should.have.been.calledOnceWith(arg1, _arg3)
      }).to.not.throw()
    })

    it('should handle deep objects in arguments', () => {
      spy(arg1, arg4)
      const _arg4 = JSON.parse(JSON.stringify(arg4))

      expect(() => {
        spy.should.have.been.calledOnceWith(arg1, _arg4)
      }).to.not.throw()
    })
  })

  describe('always calledOnceWith', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.always.have.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called once with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.always.have.been.calledOnceWith(arg1, arg2)
      }).to.not.throw
      expect(() => {
        spy.should.have.always.been.calledOnceWith(arg1, arg2)
      }).to.not.throw
      expect(() => {
        spy.should.have.been.always.calledOnceWith(arg1, arg2)
      }).to.not.throw
    })

    it('should throw an assertion error when the spy is called more than once', () => {
      spy(arg1, arg2)
      spy(arg1, arg2)

      expect(() => {
        spy.should.always.have.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called once with the correct arguments and more', () => {
      spy(arg1, arg2, notArg)

      expect(() => {
        spy.should.always.have.been.calledOnceWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.always.been.calledOnceWith(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.been.always.calledOnceWith(arg1, arg2)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.always.have.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledOnceWith(arg1, arg2)
      }).to.throw(AssertionError)
    })
  })

  describe('calledWithExactly', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.have.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledWithExactly(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.been.calledWithExactly(arg1, arg2)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called with the correct arguments and more', () => {
      spy(arg1, arg2, notArg)

      expect(() => {
        spy.should.have.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.have.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with incorrect arguments but then correct ones', () => {
      spy(notArg, arg1)
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledWithExactly(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.getCall(1).should.have.been.calledWithExactly(arg1, arg2)
      }).to.not.throw()
    })
  })

  describe('always calledWithExactly', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.always.have.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.always.have.been.calledWithExactly(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.always.been.calledWithExactly(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.been.always.calledWithExactly(arg1, arg2)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called with the correct arguments and more', () => {
      spy(arg1, arg2, notArg)

      expect(() => {
        spy.should.always.have.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.always.have.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called with incorrect arguments but then correct ones',
      () => {
        spy(notArg, arg1)
        spy(arg1, arg2)

        expect(() => {
          spy.should.always.have.been.calledWithExactly(arg1, arg2)
        }).to.throw(AssertionError)
        expect(() => {
          spy.should.have.always.been.calledWithExactly(arg1, arg2)
        }).to.throw(AssertionError)
        expect(() => {
          spy.should.have.been.always.calledWithExactly(arg1, arg2)
        }).to.throw(AssertionError)
      })
  })

  describe('calledOnceWithExactly', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.have.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called once with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledOnceWithExactly(arg1, arg2)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called more than once', () => {
      spy(arg1, arg2)
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called once with the correct arguments and more',
      () => {
        spy(arg1, arg2, notArg)

        expect(() => {
          spy.should.have.been.calledOnceWithExactly(arg1, arg2)
        }).to.throw(AssertionError)
      })

    it('should throw an assertion error when the spy is called once with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.have.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })
  })

  describe('always calledOnceWithExactly', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.always.have.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called once with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.always.have.been.calledOnceWithExactly(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.always.been.calledOnceWithExactly(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.been.always.calledOnceWithExactly(arg1, arg2)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called more than once', () => {
      spy(arg1, arg2)
      spy(arg1, arg2)

      expect(() => {
        spy.should.always.have.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called once with the correct arguments and more',
      () => {
        spy(arg1, arg2, notArg)

        expect(() => {
          spy.should.always.have.been.calledOnceWithExactly(arg1, arg2)
        }).to.throw(AssertionError)
        expect(() => {
          spy.should.have.always.been.calledOnceWithExactly(arg1, arg2)
        }).to.throw(AssertionError)
        expect(() => {
          spy.should.have.been.always.calledOnceWithExactly(arg1, arg2)
        }).to.throw(AssertionError)
      })

    it('should throw an assertion error when the spy is called once with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.always.have.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledOnceWithExactly(arg1, arg2)
      }).to.throw(AssertionError)
    })
  })

  describe('calledWithMatch', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.have.been.calledWithMatch(any, any)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledWithMatch(any, any)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.been.calledWithMatch(any, any)
      }).to.not.throw()
    })

    it('should not throw when the spy is called with the correct arguments and more', () => {
      spy(arg1, arg2, notArg)

      expect(() => {
        spy.should.have.been.calledWithMatch(any, any)
      }).to.not.throw()
      expect(() => {
        spy.getCall(0).should.have.been.calledWithMatch(any, any)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.have.been.calledWithMatch(any, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.getCall(0).should.have.been.calledWithMatch(arg1, any)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with incorrect arguments but then correct ones', () => {
      spy(notArg, arg1)
      spy(arg1, arg2)

      expect(() => {
        spy.should.have.been.calledWithMatch(arg1, arg2)
      }).to.not.throw()
      expect(() => {
        spy.getCall(1).should.have.been.calledWithMatch(arg1, arg2)
      }).to.not.throw()
    })
  })

  describe('always calledWithMatch', () => {
    it('should throw an assertion error when the spy is not called', () => {
      expect(() => {
        spy.should.always.have.been.calledWithMatch(any, any)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledWithMatch(arg1, any)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledWithMatch(any, arg2)
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called with the correct arguments', () => {
      spy(arg1, arg2)

      expect(() => {
        spy.should.always.have.been.calledWithMatch(any, any)
      }).to.not.throw()
      expect(() => {
        spy.should.have.always.been.calledWithMatch(any, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.been.always.calledWithMatch(arg1, any)
      }).to.not.throw()
    })

    it('should not throw when the spy is called with the correct arguments and more', () => {
      spy(arg1, arg2, notArg)

      expect(() => {
        spy.should.always.have.been.calledWithMatch(any, any)
      }).to.not.throw()
      expect(() => {
        spy.should.have.always.been.calledWithMatch(any, arg2)
      }).to.not.throw()
      expect(() => {
        spy.should.have.been.always.calledWithMatch(arg1, any)
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called with incorrect arguments', () => {
      spy(notArg, arg1)

      expect(() => {
        spy.should.always.have.been.calledWithMatch(any, arg2)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.always.been.calledWithMatch(arg1, any)
      }).to.throw(AssertionError)
      expect(() => {
        spy.should.have.been.always.calledWithMatch(arg1, arg2)
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called with incorrect arguments but then correct ones',
      () => {
        spy(notArg, arg1)
        spy(arg1, arg2)

        expect(() => {
          spy.should.always.have.been.calledWithMatch(arg1, arg2)
        }).to.throw(AssertionError)
        expect(() => {
          spy.should.have.always.been.calledWithMatch(arg1, arg2)
        }).to.throw(AssertionError)
        expect(() => {
          spy.should.have.been.always.calledWithMatch(arg1, arg2)
        }).to.throw(AssertionError)
      })
  })
})
