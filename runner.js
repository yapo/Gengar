(() => {
  'use strict';

  /* Globals */
  const fs = require('fs');
  const exec = require('child_process').exec;

  /**
   * If images/ dir doesnt exist, create it.
   **/
  function createDir(dirName) {
    // console.log('imagesDir');
    try {
      fs.readdirSync(dirName);
    } catch(e) {
      fs.mkdirSync(dirName);
    }
  }

  /**
   * Run one test.
   **/
  function runTest(test) {
    console.log('runTest: ', test);
    exec('node ' + test, function(error, stdout, stderr) {
      console.log('error: ', error);
      console.log('stdout: ', stdout);
      console.log('stderr: ', stderr);
    });
  }

  /**
   * Find all test files and run them.
   **/
  function runAllTests() {
    // console.log('runAllTests');
    let testDir;
    let currentTest;

    const tests = fs.readdirSync('tests');
    tests.forEach(function(dir) {
      try {
        testDir = fs.readdirSync('tests/' + dir);
        testDir.forEach(function(test) {
          currentTest = 'tests/' + dir + '/' + test;
          console.log('currentTest: ', currentTest);
          runTest(currentTest);
        });
      } catch(e) {
        // console.log('runAllTests error: ', e);
      }
    });

    generateDiffs();
  }

  function generateDiffs() {

  }

  (function init()  {
    createDir('images');
    createDir('tests');

    runAllTests();
  })();
})();

