# sort-package-json-rs

Node.js bindings and CLI for OXC(oxfmt)'s `package.json` sorter.

<!-- automd:badges color="yellow" license name="sort-package-json-rs" codecov bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/sort-package-json-rs?color=yellow)](https://npmjs.com/package/sort-package-json-rs)
[![npm downloads](https://img.shields.io/npm/dm/sort-package-json-rs?color=yellow)](https://npm.chart.dev/sort-package-json-rs)
[![bundle size](https://img.shields.io/bundlephobia/minzip/sort-package-json-rs?color=yellow)](https://bundlephobia.com/package/sort-package-json-rs)
[![install size](https://badgen.net/packagephobia/install/sort-package-json-rs?color=yellow)](https://packagephobia.com/result?p=sort-package-json-rs)
[![codecov](https://img.shields.io/codecov/c/gh/maxchang3/sort-package-json-rs?color=yellow)](https://codecov.io/gh/maxchang3/sort-package-json-rs)
[![license](https://img.shields.io/github/license/maxchang3/sort-package-json-rs?color=yellow)](https://github.com/maxchang3/sort-package-json-rs/blob/main/LICENSE)

<!-- /automd -->

## Introduction

[oxc-project/sort-package-json](https://github.com/oxc-project/sort-package-json) is a fast Rust implementation for sorting `package.json` files. Inspired by [keithamus/sort-package-json](https://github.com/keithamus/sort-package-json), it serves as the underlying sorting engine for [oxfmt](https://oxc.rs/docs/guide/usage/formatter/sorting.html#sort-package-json-fields).

This package provides fast Node.js bindings to OXC's implementation, along with a CLI interface similar to the original `sort-package-json` package.

> **Note on Compatibility**: `oxc-project/sort-package-json` is not strictly compatible with the original `sort-package-json` npm package. It uses a different sorting algorithm and field order, so the output may differ from the original package.

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

## CLI

Run it via npx, pnpm dlx, bunx, or deno run:

<!-- automd:pm-x version="latest" name="sort-package-json-rs" -->

```sh
# npm
npx sort-package-json-rs@latest

# pnpm
pnpm dlx sort-package-json-rs@latest

# bun
bunx sort-package-json-rs@latest

# deno
deno run -A npm:sort-package-json-rs@latest
```

<!-- /automd -->

Usage Options

```bash
$ sort-package-json-rs --help
sort-package-json-rs/0.0.2

Usage:
  $ sort-package-json-rs [...files]

Commands:
  [...files]  Sort package.json files

For more info, run any command with the `--help` flag:
  $ sort-package-json-rs --help

Options:
  -c, --check          Check if files are sorted without modifying them 
  -q, --quiet          Don't output success messages 
  --stdin              Read package.json from stdin 
  -i, --ignore <glob>  Glob patterns to ignore (default: node_modules/**)
  -v, --version        Display version number 
  -h, --help           Display this message 
```

## API

### Basic Usage

```javascript
import { sortPackageJson } from 'sort-package-json-rs';

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

// Use default options (pretty-printed)
const sorted = sortPackageJson(JSON.stringify(unsorted));
console.log(sorted);

// Or with custom options
const compactSorted = sortPackageJson(JSON.stringify(unsorted), {
  pretty: false,
  sortScripts: true
});
console.log(compactSorted);
```

### TypeScript Types

<!-- automd:file src="./index.d.ts" code=true lang="typescript" lines=3: -->

```typescript [index.d.ts]
/** Options for controlling JSON formatting when sorting */
export interface SortOptions {
  /** Whether to pretty-print the output JSON */
  pretty: boolean
  /** Whether to sort the scripts field alphabetically */
  sortScripts: boolean
}

/**
 * Sorts a package.json string with optional custom options
 * If options is not provided, uses default options (pretty-printed)
 */
export declare function sortPackageJson(input: string, options?: SortOptions | undefined | null): string
```

<!-- /automd -->

## Benchmarks

Using [tests/index.bench.ts](./tests/index.bench.ts) with `vitest bench`:

| Test Case                   | Original (hz) | RS Binding (hz) | Speedup |
| --------------------------- | ------------- | --------------- | ------- |
| Small package.json          | 15,719.80     | 25,073.37       | 1.60x ⚡ |
| Already sorted package.json | 17,005.20     | 26,249.62       | 1.54x ⚡ |
| Minimal package.json        | 139,344.74    | 907,643.81      | 6.51x ⚡ |
| Large package.json          | 42,820.94     | 72,237.26       | 1.69x ⚡ |

*Executed on an MacBook Air (M1, 2020, 16GB RAM) with Node.js v23.7.0.*

## Credits

Some code and tests are adapted from [keithamus/sort-package-json](keithamus/sort-package-json) and [oxc-project/sort-package-json](https://github.com/oxc-project/sort-package-json).

## License

[MIT](./LICENSE) License © [maxchang3](https://github.com/maxchang3)

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
