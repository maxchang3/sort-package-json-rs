// @ts-check
const { sortPackageJson } = require('../index.js')
const { readFileSync, writeFileSync } = require('node:fs')

const packageJson = readFileSync('package.json', 'utf-8')
const sorted = sortPackageJson(packageJson)

writeFileSync('package.json', sorted)
