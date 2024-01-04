'use strict'

import * as chai from 'chai'

import sinonChai from '../lib/sinon-chai.cjs'
chai.use(sinonChai)
chai.should()

export function swallow (thrower) {
  try {
    thrower()
  } catch (e) {
    // Intentionally swallow
  }
};
