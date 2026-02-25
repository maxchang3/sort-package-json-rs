// From https://github.com/oxc-project/sort-package-json/blob/main/benches/sort.rs
import OriginalSortPackageJson from 'sort-package-json'
import { bench, describe } from 'vitest'
import { sortPackageJson } from '../index.js'
import packageJson from './fixtures/package.json'

const fixture = JSON.stringify(packageJson)

describe('sort small package.json', () => {
  bench('Original sort-package-json (JavaScript)', () => {
    OriginalSortPackageJson(fixture)
  })

  bench("Node.js bindings for OXC's sort-package-json", () => {
    sortPackageJson(fixture)
  })
})

describe('sort already sorted package.json', () => {
  const sortedByOxc = sortPackageJson(fixture)
  const sortedByOriginal = OriginalSortPackageJson(fixture)

  bench('Original sort-package-json (JavaScript)', () => {
    OriginalSortPackageJson(sortedByOriginal)
  })

  bench("Node.js bindings for OXC's sort-package-json", () => {
    sortPackageJson(sortedByOxc)
  })
})

describe('sort minimal package.json', () => {
  const minimal = JSON.stringify({
    version: '1.0.0',
    name: 'test',
    description: 'A test package',
  })

  bench('Original sort-package-json (JavaScript)', () => {
    OriginalSortPackageJson(minimal)
  })

  bench("Node.js bindings for OXC's sort-package-json", () => {
    sortPackageJson(minimal)
  })
})

describe('sort large package.json', () => {
  const large = JSON.stringify({
    version: '1.0.0',
    dependencies: {
      react: '^18.0.0',
      axios: '^1.0.0',
      lodash: '^4.17.21',
      express: '^4.18.0',
      typescript: '^5.0.0',
      webpack: '^5.0.0',
      'babel-loader': '^9.0.0',
      eslint: '^8.0.0',
      prettier: '^3.0.0',
      jest: '^29.0.0',
    },
    devDependencies: {
      '@types/react': '^18.0.0',
      '@types/node': '^20.0.0',
      '@types/express': '^4.17.0',
      'ts-node': '^10.0.0',
      nodemon: '^3.0.0',
      concurrently: '^8.0.0',
    },
    scripts: {
      test: 'jest',
      build: 'webpack',
      lint: 'eslint .',
      format: 'prettier --write .',
      dev: 'nodemon',
      start: 'node dist/index.js',
      pretest: 'npm run lint',
      postbuild: 'echo "Build complete"',
    },
    name: 'large-package',
    description: 'A larger test package',
    keywords: ['test', 'large', 'package', 'example', 'benchmark'],
    author: 'Test Author <test@example.com>',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'https://github.com/test/test',
    },
    bugs: {
      url: 'https://github.com/test/test/issues',
    },
    homepage: 'https://github.com/test/test#readme',
    main: './dist/index.js',
    types: './dist/index.d.ts',
    files: ['dist', 'README.md', 'LICENSE'],
    engines: {
      node: '>=18.0.0',
      npm: '>=8.0.0',
    },
  })

  bench('Original sort-package-json (JavaScript)', () => {
    OriginalSortPackageJson(large)
  })

  bench("OXC's sort-package-json (Rust, Node.js binding)", () => {
    sortPackageJson(large)
  })
})
