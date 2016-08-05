'use strict';

const fs = require('fs');
const router = require('express').Router();

const getTests = require('../helpers/getTests');
const replaceBase = require('../helpers/replaceBase');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/data', (req, res) => {
  res.send(getTests());
});

router.get('/setBase/:image', (req, res) => {
  let what = replaceBase(req.params.image);
  res.send(what);
});

module.exports = router;

