import globals from 'globals'
import merge from '@sequencemedia/eslint-config-standard/merge'

export default (
  merge({
    files: [
      '**/*.{cjs,mjs}'
    ],
    ignores: [
      'coverage',
      'test'
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
          'test/**/*.{cjs,mjs}'
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
