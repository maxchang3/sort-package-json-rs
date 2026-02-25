# sort-package-json-rs

OXC's sort-package-json binding to Node.js.

<!-- automd:badges color="yellow" license name="sort-package-json-rs" codecov bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/sort-package-json-rs?color=yellow)](https://npmjs.com/package/sort-package-json-rs)
[![npm downloads](https://img.shields.io/npm/dm/sort-package-json-rs?color=yellow)](https://npm.chart.dev/sort-package-json-rs)
[![bundle size](https://img.shields.io/bundlephobia/minzip/sort-package-json-rs?color=yellow)](https://bundlephobia.com/package/sort-package-json-rs)
[![install size](https://badgen.net/packagephobia/install/sort-package-json-rs?color=yellow)](https://packagephobia.com/result?p=sort-package-json-rs)

<!-- /automd -->

## Introduction

[oxc-project/sort-package-json](https://github.com/oxc-project/oxc) is a Rust implementation for sorting `package.json` files, inspired by [keithamus/sort-package-json](https://github.com/keithamus/sort-package-json). It is used by [oxfmt](https://oxc.rs/docs/guide/usage/formatter/sorting.html#sort-package-json-fields), a high-performance formatter, as a core component.

This package provides Node.js bindings to OXC's implementation, allowing you to sort your `package.json` files efficiently and reliably from JavaScript.

## Installation

<!-- automd:pm-install name="sort-package-json-rs" auto=false-->

```sh
# npm
npm install sort-package-json-rs

# yarn
yarn add sort-package-json-rs

# pnpm
pnpm add sort-package-json-rs

# bun
bun install sort-package-json-rs

# deno
deno install npm:sort-package-json-rs
```

<!-- /automd -->

## Usage

```javascript
import { sortPackageJson } from 'sort-package-json';

const unsorted = {
  dependencies: {
    'react': '^18.0.0',
    'typescript': '^5.0.0',
    'lodash': '^4.17.0'
  },
  name: 'my-package',
  version: '1.0.0',
  scripts: {
    'build': 'tsc',
    'test': 'vitest'
  }
};

const sorted = sortPackageJson(unsorted);
console.log(sorted);
```

## API

<!-- automd:file src="./index.d.ts" code=true lang="typescript" lines=3: -->

```typescript [index.d.ts]
/** Options for controlling JSON formatting when sorting */
export interface SortOptions {
  /** Whether to pretty-print the output JSON */
  pretty: boolean
  /** Whether to sort the scripts field alphabetically */
  sortScripts: boolean
}

/** Sorts a package.json string with default options (pretty-printed) */
export declare function sortPackageJson(input: string): string

/** Sorts a package.json string with custom options */
export declare function sortPackageJsonWithOptions(input: string, options: SortOptions): string
```

<!-- /automd -->

## Benchmarks

Using [tests/index.bench.ts](./tests/index.bench.ts) with `pnpm bench`:

| Test Case                   | Original (hz) | RS Binding (hz) | Speedup |
| --------------------------- | ------------- | --------------- | ------- |
| Small package.json          | 15,719.80     | 25,073.37       | 1.60x ⚡ |
| Already sorted package.json | 17,005.20     | 26,249.62       | 1.54x ⚡ |
| Minimal package.json        | 139,344.74    | 907,643.81      | 6.51x ⚡ |
| Large package.json          | 42,820.94     | 72,237.26       | 1.69x ⚡ |

*Executed on an Apple M1 Pro (8-core CPU) with Node.js v23.7.0.*

## License

[MIT](./LICENSE) License © [maxchang3](https://github.com/maxchang3)

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
