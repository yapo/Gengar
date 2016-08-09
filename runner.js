#!/usr/bin/env node

(() => {
  'use strict';

  /* Globals */
  const fs = require('fs');
  const chalk = require('chalk');
  const exec = require('child_process').exec;

  const noConfig = chalk.red('No Gengar.json found. Can\'t run Gengar without it so ... bye!');
  const noTestsPath = chalk.red('No testsPath found on Gengar.json.');
  const noImagesPath = chalk.red('No imagesPath found on Gengar.json.');

  let doneTests = 0;

  function checkConfigPath() {
    process.argv.forEach((opt) => {
      if (opt.indexOf('configPath') > -1) {
        return fs.readFileSync(opt.split('=') + '/Gengar.json');
      }
    });

    return false;
  }

  function validateConfig() {
    let config = false;
    let isItHere = fs.readdirSync('.').indexOf('Gengar.json') > -1;

    try {
      if (isItHere) {
        config = JSON.parse(fs.readFileSync('./Gengar.json'));
      } else {
        config = checkConfigPath();
      }
    } catch(e) {
      console.log(chalk.red('Failed finding Gengar.json because: ', e));
    }

    return config;
  }

  /**
   * Run one test.
   **/
  function runTest(test) {
    console.log('Executing ~> ', test);
    exec('node ' + test, function(error, stdout, stderr) {
      if (error) {
        console.log(chalk.red(`Error executing ${test} => ${error}`));
      }

      if (stdout) {
        console.log(chalk.yellow(`Stdout received from ${test} => ${stdout}`));
      }

      if (stderr) {
        console.log(chalk.red(`Stderr received from ${test} => ${stderr}`));
      }

      doneTests++;
    });
  }

  /**
   * Find all test files and run them.
   **/
  function runAllTests(config) {
    let tests;
    let testDir;
    let currentTest;

    let allTests = [];

    const TESTSPATH = config['testsPath'];

    try {
      tests = fs.readdirSync(TESTSPATH);
    } catch(e) {
      console.log(chalk.red('Cant read TESTSPATH because: ', e));
      return false;
    }

    tests.forEach(function(dir, index, list) {
      try {
        testDir = fs.readdirSync(TESTSPATH + dir);
        testDir.forEach(function(test) {
          currentTest = TESTSPATH + dir + '/' + test;

          allTests.push(runTest(currentTest));
        });
      } catch(e) {
        console.log(chalk.red('Had problems running some tests because: ', e));
      }
    });

    checkTests(allTests, config);
  }

  function checkTests(tests, config) {
    console.log(chalk.green(`Waiting on ${tests.length - doneTests} tests`));

    /*
    console.log('doneTests: ', doneTests);
    console.log('tests.length: ', tests.length);
    */

    if (doneTests === tests.length) {
      generateDiffs(config);
    } else {
      setTimeout(function() {
        checkTests(tests, config)
      }, 5000);
    }
  }

  function generateDiffs(config) {
    console.log(chalk.green('Generating diffs...'));

    let split;
    let images;
    let composite;

    let diff = 0;

    const IMAGESPATH = config['imagesPath'];

    try {
      images = fs.readdirSync(IMAGESPATH);
    } catch(e) {
      console.log(chalk.red(noImagesPath));
    }

    images.forEach(function(curr) {
      split = curr.split('.');

      composite = `${IMAGESPATH}${split[0]}.${split[1]}`;

      exec(`compare ${composite}.base.png ${composite}.new.png ${composite}.diff.png`);

      exec(`compare -metric RMSE ${composite}.base.png ${composite}.new.png NULL:`, function(error, stdout, stderr) {

        if (stderr.split('(').length > 1) {
          diff = parseInt(stderr.split('(')[1].replace(')', ''));
        } else if (stderr.indexOf('differ') > -1) {
          console.log(chalk.red(`Width and height of ${curr} differ, so no diff can be made.`));
        }

        if (diff > 0) {
          fs.writeFileSync(`${composite}.json`, `{passed: ${diff}}`);
        }
      });
    });

    startViewer();
  }

  function startViewer() {
    let dir = __dirname;

    try {
      process.chdir(dir);

      require('child_process').exec('npm start &');
    } catch(e) {
      console.log(chalk.red('Something wrong: ', e));
    }
  }

  (function init()  {
    const config = validateConfig();

    if (config) {
      runAllTests(config);
    } else {
      console.log(chalk.red(noConfig));
    }
  })();
})();

