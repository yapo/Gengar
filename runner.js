(() => {
  'use strict';

  /* Globals */
  const fs = require('fs');
  const exec = require('child_process').exec;

  let doneTests = 0;

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
    exec('time node ' + test, function(error, stdout, stderr) {
      console.log('error: ', error);
      console.log('stdout: ', stdout);
      console.log('stderr: ', stderr);

      doneTests++;
    });
  }

  /**
   * Find all test files and run them.
   **/
  function runAllTests() {
    // console.log('runAllTests');
    let testDir;
    let currentTest;

    let allTests = [];

    const tests = fs.readdirSync('tests');

    tests.forEach(function(dir, index, list) {
      try {
        testDir = fs.readdirSync('tests/' + dir);
        testDir.forEach(function(test) {
          currentTest = 'tests/' + dir + '/' + test;
          console.log('currentTest: ', currentTest);
          allTests.push(runTest(currentTest));
        });
      } catch(e) {
        console.log('runAllTests error: ', e);
      }
    });

    checkTests(allTests);
  }

  function checkTests(tests) {
    console.log('doneTests: ', doneTests);
    console.log('tests.length: ', tests.length);

    if (doneTests === tests.length) {
      console.log('all done, generate diffs');
      generateDiffs();
    } else {
      setTimeout(function() {
        checkTests(tests)
      }, 5000);
    }
  }

  function generateDiffs() {
    console.log('generateDiffs');

    let split;
    let composite;
    let images = fs.readdirSync('images');

    images.forEach(function(curr) {
      split = curr.split('.');
      composite = `images/${split[0]}.${split[1]}`;

      exec(`compare ${composite}.base.png ${composite}.new.png ${composite}.diff.png`);
      
      exec(`compare -metric RMSE ${composite}.base.png ${composite}.new.png NULL:`, function(error, stdout, stderr) {
        console.log('stderr: ', stderr);
      });
    });
  }

  (function init()  {
    createDir('images');
    createDir('tests');

    runAllTests();
  })();
})();

