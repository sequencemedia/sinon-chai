import sinon from 'sinon'
import { expect } from 'chai'

describe('Regressions', () => {
  specify('GH-19: functions with `proxy` properties', () => {
    function func () {
      // Contents don't matter
    }
    func.proxy = 5

    const spy = sinon.spy(func)
    spy()

    expect(() => {
      spy.should.have.been.called
    }).to.not.throw()
  })

  specify('GH-94: assertions on calls', () => {
    function func () {
      // Contents don't matter
    }
    const spy = sinon.spy(func)

    spy(1, 2, 3)
    spy(4, 5, 6)

    expect(() => {
      spy.lastCall.should.have.been.calledWith(4, 5, 6)
    }).to.not.throw()
  })
})
