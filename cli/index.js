#!/usr/bin/env node
// @ts-check
import fs from 'node:fs/promises'
import streamConsumers from 'node:stream/consumers'
import { cac } from 'cac'
import { glob } from 'tinyglobby'
import { sortPackageJson } from '../index.js'
import packageJson from '../package.json' with { type: 'json' }
import Reporter from './reporter.js'

/**
 * @typedef {{
 *  check?: boolean;
 *  quiet?: boolean;
 *  stdin?: boolean;
 *  ignore?: string | string[]
 * }} CliOptions
 */

const cli = cac('sort-package-json-rs')

cli
  .command('[...files]', 'Sort package.json files')
  .option('-c, --check', 'Check if files are sorted without modifying them')
  .option('-q, --quiet', "Don't output success messages")
  .option('--stdin', 'Read package.json from stdin')
  .option('-i, --ignore <glob>', 'Glob patterns to ignore', {
    default: ['node_modules/**'],
  })
  .action(
    /**
     * @param {string[]} files
     * @param {CliOptions} options
     */
    async (files, options) => {
      if (options.stdin) {
        process.stdout.write(sortPackageJson(await streamConsumers.text(process.stdin)))
        return
      }

      const patterns = files.length > 0 ? files : ['package.json']
      const ignore = options.ignore
        ? Array.isArray(options.ignore)
          ? options.ignore
          : [options.ignore]
        : ['node_modules/**']

      const matchedFiles = await glob(patterns, { ignore })
      const reporter = new Reporter({
        isCheck: options.check ?? false,
        shouldBeQuiet: options.quiet ?? false,
      })

      for (const file of matchedFiles) {
        reporter.reportFound(file)

        /** @type {string} */
        let original
        try {
          original = await fs.readFile(file, 'utf8')
        } catch (error) {
          reporter.reportFailed(file, error)
          continue
        }

        const sorted = sortPackageJson(original)

        if (sorted === original) {
          reporter.reportNotChanged(file)
          continue
        }

        if (!options.check) {
          try {
            await fs.writeFile(file, sorted)
          } catch (error) {
            reporter.reportFailed(file, error)
            continue
          }
        }

        reporter.reportChanged(file)
      }

      reporter.printSummary()
    }
  )

cli.version(packageJson.version)
cli.help()
cli.parse()
