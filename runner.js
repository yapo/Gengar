#!/usr/bin/env node

(() => {
  'use strict';

  /* Globals */
  const fs = require('fs');
  const exec = require('child_process').exec;
  const noConfig = 'No Gengar.json found. Can\'t run Gengar without it so ... bye!';

  let doneTests = 0;

  function validateConfig() {
    let config = false;

    process.argv.forEach((elm) => {
      if (elm.indexOf('configPath') > -1) {
        let jsonPath = elm.replace('--configPath=','');

        try {
          config = JSON.parse(fs.readFileSync(jsonPath));
        } catch (e) {
          console.log('process.argv.forEach: ', e);
        }
      }
    });

    if (!config) {
      try {
        config = JSON.parse(fs.readFileSync('./Gengar.json'));
      } catch(e) {
        console.log('!config: ', e);
      }
    }

    return config;
  }

  /**
   * Run one test.
   **/
  function runTest(test) {
    console.log('running: ', test);
    exec('time node ' + test, function(error, stdout, stderr) {
      //console.log('error: ', error);
      //console.log('stdout: ', stdout);
      //console.log('stderr: ', stderr);

      doneTests++;
    });
  }

  /**
   * Find all test files and run them.
   **/
  function runAllTests(config) {
    // console.log('runAllTests');
    let testDir;
    let currentTest;

    let allTests = [];

    const TESTSPATH = config['testsPath'];
    const tests = fs.readdirSync(TESTSPATH);

    tests.forEach(function(dir, index, list) {
      try {
        testDir = fs.readdirSync(TESTSPATH + dir);
        testDir.forEach(function(test) {
          currentTest = TESTSPATH + dir + '/' + test;

          //console.log('currentTest: ', currentTest);

          allTests.push(runTest(currentTest));
        });
      } catch(e) {
        //console.log('runAllTests error: ', e);
      }
    });

    checkTests(allTests, config);
  }

  function checkTests(tests, config) {
    //console.log('doneTests: ', doneTests);
    //console.log('tests.length: ', tests.length);

    if (doneTests === tests.length) {
      console.log('all done, generate diffs');
      generateDiffs(config);
    } else {
      setTimeout(function() {
        checkTests(tests, config)
      }, 5000);
    }
  }

  function generateDiffs(config) {
    console.log('generateDiffs');

    let split;
    let composite;

    let diff = 0;

    const IMAGESPATH = config['imagesPath'];
    const images = fs.readdirSync(IMAGESPATH);

    images.forEach(function(curr) {
      split = curr.split('.');

      composite = `${IMAGESPATH}${split[0]}.${split[1]}`;

      exec(`compare ${composite}.base.png ${composite}.new.png ${composite}.diff.png`);

      exec(`compare -metric RMSE ${composite}.base.png ${composite}.new.png NULL:`, function(error, stdout, stderr) {
        if (stderr.split('(').length > 1) {
          diff = parseInt(stderr.split('(')[1].replace(')', ''));
        } else if (stderr.indexOf('differ') > -1) {
          console.log(`Width and height of ${curr} differ, so no diff can be made.`);
        }

        if (diff > 0) {
          fs.writeFileSync(`${composite}.json`, `{passed: ${diff}}`);
        }
      });
    });

    startViewer();
  }

  function startViewer() {
    process.chdir('viewer/');
    require('child_process').exec('npm start &');
  }

  (function init()  {
    const config = validateConfig();

    if (config) {
      runAllTests(config);
    } else {
      console.log(noConfig);
    }
  })();
})();

