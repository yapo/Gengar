
const fs = require('fs');
const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  'use strict';

  let tests;
  let testDirs = {};
  let dirs = fs.readdirSync('../tests');
  let images = fs.readdirSync('../images');

  console.log('images: ', images);

  dirs.forEach(function(elems, index, total) {
    try {
      tests = fs.readdirSync(`../tests/${elems}`);
      testDirs[elems] = tests;
    } catch(e) {
      console.log('Error searching for tests: ', e);
    }
  });

  console.log('testDirs: ', testDirs);

  res.render('index', {
    title: 'Gengar Viewer',
    testDirs: testDirs
  });

});

module.exports = router;

