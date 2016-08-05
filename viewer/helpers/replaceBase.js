
const fs = require('fs');
const IMAGEPATH = 'public/images/';

const replaceBase = function(path) {
  const pathBase = path.replace('.new.png', '');

  const base = pathBase + '.base.png';
  const diff = pathBase + '.diff.png';

  fs.unlinkSync(IMAGEPATH + base);
  fs.unlinkSync(IMAGEPATH + diff);

  fs.renameSync(IMAGEPATH + path, IMAGEPATH + base.toLowerCase());

  return base;
}

module.exports = replaceBase;

