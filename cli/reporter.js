// @ts-check

/**
 * @typedef {{
 *  isCheck: boolean,
 *  shouldBeQuiet: boolean
 *  }} ReporterOptions
 */

/**
 * @typedef {{
 *  log: (...args: unknown[]) => void,
 *  error: (...args: unknown[]) => void
 * }} Logger
 */

const getFilesCountText = (/** @type {number} */ count) => (count === 1 ? '1 file' : `${count} files`)

/**
 * @typedef {{
 *   matchedFilesCount: number;
 *   failedFilesCount: number;
 *   wellSortedFilesCount: number;
 *   changedFilesCount: number;
 * }} Status
 */

class Reporter {
  #hasPrinted = false
  /** @type {ReporterOptions} */
  #options
  /** @type {Status} */
  #status
  /** @type {Logger} */
  #logger

  /**
   * @param {ReporterOptions} options
   */
  constructor(options) {
    this.#options = options
    this.#status = {
      matchedFilesCount: 0,
      failedFilesCount: 0,
      wellSortedFilesCount: 0,
      changedFilesCount: 0,
    }

    this.#logger = options.shouldBeQuiet
      ? { log() {}, error() {} }
      : {
          log: (...args) => {
            this.#hasPrinted = true
            console.log(...args)
          },
          error: (...args) => {
            this.#hasPrinted = true
            console.error(...args)
          },
        }
  }

  /** @param {string} _file */
  reportFound(_file) {
    this.#status.matchedFilesCount++
  }

  /** @param {string} _file */
  reportNotChanged(_file) {
    this.#status.wellSortedFilesCount++
  }

  /** @param {string} file */
  reportChanged(file) {
    this.#status.changedFilesCount++
    this.#logger.log(this.#options.isCheck ? `${file}` : `${file} is sorted!`)
  }

  /**
   * @param {string} file
   * @param {unknown} error
   */
  reportFailed(file, error) {
    this.#status.failedFilesCount++
    console.error('Error on: ' + file)
    this.#logger.error(error instanceof Error ? error.message : String(error))
  }

  printSummary() {
    const { matchedFilesCount, failedFilesCount, changedFilesCount, wellSortedFilesCount } = this.#status

    if (matchedFilesCount === 0) {
      console.error('No matching files.')
      process.exitCode = 2
      return
    }

    const { isCheck, shouldBeQuiet } = this.#options

    if (isCheck && changedFilesCount) {
      process.exitCode = 1
    }

    if (failedFilesCount) {
      process.exitCode = 2
    }

    if (shouldBeQuiet) {
      return
    }

    const { log } = this.#logger

    // Print an empty line.
    if (this.#hasPrinted) {
      log()
    }

    // Matched files
    log('Found %s.', getFilesCountText(matchedFilesCount))

    // Failed files
    if (failedFilesCount) {
      log('%s could not be %s.', getFilesCountText(failedFilesCount), isCheck ? 'checked' : 'sorted')
    }

    // Changed files
    if (changedFilesCount) {
      if (isCheck) {
        log('%s %s not sorted.', getFilesCountText(changedFilesCount), changedFilesCount === 1 ? 'was' : 'were')
      } else {
        log('%s successfully sorted.', getFilesCountText(changedFilesCount))
      }
    }

    // Well-sorted files
    if (wellSortedFilesCount) {
      log('%s %s already sorted.', getFilesCountText(wellSortedFilesCount), wellSortedFilesCount === 1 ? 'was' : 'were')
    }
  }
}

export default Reporter
