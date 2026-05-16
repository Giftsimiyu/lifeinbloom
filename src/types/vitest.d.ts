// stub module declaration so TypeScript language service stops complaining
// actual types come from the vitest package when running tests

declare module 'vitest' {
  const vitest: any
  export = vitest
}

// also provide global helpers that Vitest injects
declare global {
  /** test-suite grouping */
  var describe: typeof import('vitest').describe
  /** individual test case */
  var it: typeof import('vitest').it
  /** expectation helper */
  var expect: typeof import('vitest').expect
  /** lifecycle hook */
  var beforeEach: typeof import('vitest').beforeEach
  /** mock/spy utility */
  var vi: typeof import('vitest').vi
}
