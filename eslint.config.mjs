import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard'

function merge (alpha) {
  return (
    standard
      .map((omega) => ({
        ...omega,
        ...alpha
      }))
  )
}

export default (
  merge({
    ignores: [
      'coverage/*',
      'test/*'
    ],
    languageOptions: {
      globals: {
        define: 'readonly',
        ...globals.node
      }
    }
  })
    .concat(
      merge({
        files: [
          'test/*'
        ],
        languageOptions: {
          globals: {
            ...globals.mocha
          }
        }
      }).concat({
        files: [
          'test/*'
        ],
        languageOptions: {
          globals: {
            ...globals.mocha
          }
        },
        rules: {
          'no-unused-expressions': 'off',
          'no-new': 'off',
          'new-cap': 'off'
        }
      })
    )
)
