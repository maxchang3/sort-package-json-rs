import test from 'ava'

import { sortPackageJson, sortPackageJsonWithOptions } from '../index.js'

test('sort function with default options', (t) => {
  const pkg = `{
    "dependencies": {
      "react": "^18.0.0",
      "typescript": "^5.0.0",
      "lodash": "^4.17.0"
    },
    "name": "my-package",
    "version": "1.0.0",
    "scripts": {
      "build": "tsc",
      "test": "jest",
      "dev": "webpack serve"
    },
    "description": "My awesome package"
  }`

  const result = sortPackageJson(pkg)
  t.true(typeof result === 'string')
  t.true(result.includes('"name": "my-package"'))
  t.true(result.includes('"version": "1.0.0"'))
  t.true(result.includes('"description": "My awesome package"'))
})

test('sort function with custom options', (t) => {
  const pkg = `{
    "dependencies": {
      "react": "^18.0.0",
      "typescript": "^5.0.0",
      "lodash": "^4.17.0"
    },
    "name": "my-package",
    "version": "1.0.0",
    "scripts": {
      "build": "tsc",
      "test": "jest",
      "dev": "webpack serve"
    },
    "description": "My awesome package"
  }`

  const result = sortPackageJsonWithOptions(pkg, { pretty: false, sortScripts: true })
  t.true(typeof result === 'string')
  t.true(result.includes('"scripts":{"build":"tsc","dev":"webpack serve","test":"jest"'))
})
