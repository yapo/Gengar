(() => {
  'use strict';

  /* Globals */
  const fs = require('fs');
  const exec = require('child_process').exec;

  const config = JSON.parse(fs.readFileSync('gengar.json'));
  
  const TESTSPATH = config['TESTSPATH'];
  const IMAGESPATH = config['IMAGESPATH'];

  let doneTests = 0;

  /**
   * If images/ dir doesnt exist, create it.
   **/
  function createDir(dirName) {
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

    const tests = fs.readdirSync(TESTSPATH);

    tests.forEach(function(dir, index, list) {
      try {
        testDir = fs.readdirSync(TESTSPATH + dir);
        testDir.forEach(function(test) {
          currentTest = TESTSPATH + dir + '/' + test;

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

    let diff;
    let split;
    let composite;
    let images = fs.readdirSync(IMAGESPATH);

    images.forEach(function(curr) {
      split = curr.split('.');
      composite = `${IMAGESPATH}${split[0]}.${split[1]}`;

      exec(`compare ${composite}.base.png ${composite}.new.png ${composite}.diff.png`);

      exec(`compare -metric RMSE ${composite}.base.png ${composite}.new.png NULL:`, function(error, stdout, stderr) {
        console.log('stderr: ', stderr.split('(')[1].replace(')', ''));
        diff = parseInt(stderr.split('(')[1].replace(')', ''));

        if (diff > 0) {
          console.log('composite: ', composite);
          console.log('diff: ', diff);
          fs.writeFileSync(`${composite}.json`, `{passed: ${diff}}`);
        }
      });
    });
  }

  (function init()  {
    createDir(IMAGESPATH);
    createDir(TESTSPATH);

    runAllTests();
  })();
})();

