import { expect, it } from 'vitest'
import { sortPackageJson } from '../index.js'
import packageJson from './fixtures/package.json'

it('should sort package.json with default options', () => {
  const result = sortPackageJson(JSON.stringify(packageJson))
  expect(result).toMatchSnapshot()
})

it('should sort package.json with custom options', () => {
  const result = sortPackageJson(JSON.stringify(packageJson), { pretty: false, sortScripts: true })
  expect(result).toMatchSnapshot()
})
