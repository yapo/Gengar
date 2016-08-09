
'use strict';

const getTests = () => {
  const fs = require('fs');

  const conf = fs.readdirSync();
  const TESTSPATH;
  const IMAGESPATH;

  const tests = fs.readdirSync(TESTSPATH);
  const images = fs.readdirSync(IMAGESPATH);

  const tree = {};
  const testNames = [];

  tests.forEach((elem) => {
    let main = fs.readdirSync(TESTSPATH + elem);

    main.forEach((what) => {
      let whatName = what.split('.')[0];
      testNames.push(whatName);

      tree[whatName] = {
        testName: what,
        states: []
      };
    });

  });

  images.forEach((image) => {
    testNames.forEach((testName) => {
      let what = image.indexOf(testName.toLowerCase()) > -1;

      let state = image.split('.')[1];
      let repeatedState = true;

      tree[testName].states.forEach((elm) => {
        if (elm === state) {
          repeatedState = false;
        }
      });

      if (what && repeatedState) {
        tree[testName].states.push(state);
      }
    })
  });
  
  return tree;
}

module.exports = getTests;

