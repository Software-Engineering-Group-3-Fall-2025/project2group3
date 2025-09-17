'use strict';

/* eslint-env node */
/* eslint-disable no-console */

/*
 * run-tests-using-node.js - Run the project #2 test code using Node.js rather than in the
 * browser.  The browser has a better debugging environment so this is more a demonstration that the
 * JavaScript works in both places. To run the test:
 *   node run-tests-using-node.js
 */

const fs = require('fs');
const vm = require('vm');

// Emulate the browser's global "window" object
global.window = global;

/**
 * processScriptFromFile - Emulate the effects of a script tag in the browser by running the
 * contents of the file as a script with its scope being the global object.
 * @param {string} filename - File name of script to load and run.
 */
function processScriptFromFile(filename) {
  try {
    const code = fs.readFileSync(filename, 'utf8');
    new vm.Script(code, { filename }).runInThisContext();
  } catch (err) {
    console.error('Error processing', filename, ':', err.message);
  }
}

console.log('*********** Running Project #2 tests ***********');

console.log('*** Loading project files ....');
processScriptFromFile('./make-multi-filter.js');
processScriptFromFile('./template-processor.js');

console.log('*** Running tests ....');
processScriptFromFile('./test-project2.js');

const { p1Message, p2Message, p3Message } = global.Project2Results || {};

const testWorked =
  p1Message === 'SUCCESS' &&
  p2Message === 'SUCCESS' &&
  p3Message === 'SUCCESS';

console.log(
  '*********** Running Project #2 tests ***********:',
  testWorked ? 'Success' : 'Fail',
);

// Exit with 0 on success, 1 on failure
process.exit(testWorked ? 0 : 1);
