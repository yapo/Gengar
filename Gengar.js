
module.exports = Gengar = (() => {
  'use strict';

  /* Inner Global Vars */
  const fs = require('fs');
  const webdriver = require('selenium-webdriver');
  const exec = require('child_process').exec;
  const By = webdriver.By;
  const until = webdriver.until;

  const config = JSON.parse(fs.readFileSync('gengar.json'));

  const PATH = config['basePath'];
  const IMAGEPATH = config['imagesPath'];

  /* Private */
  function saveScreenshot(id, data,  cropInfo) {
    let imagePath;
    let base64Data = data.replace(/^data:image\/png;base64,/,'');
    let suffix = '.base';
    let images = fs.readdirSync(IMAGEPATH);

    // Find if there's already an image to compare to
    let already = images.find(function(elm) {
      if (elm === id + '.base.png') {
        suffix = '.new';
        return true;
      }
    }) || false;

    imagePath = `${IMAGEPATH}${id}${suffix}.png`;

    fs.writeFile(imagePath, base64Data, 'base64', (err) => {
      if (cropInfo) {
        exec(`convert ${imagePath} -crop ${cropInfo.width}x${cropInfo.height}+${cropInfo.x}+${cropInfo.y} ${imagePath}`);
      }

      if (err) {
        console.log('Writing Error: ', err);
      }
    });
  }
  
  // Run the state and generate a screenshot.
  function state(id, callback) {
    let currentId = this.id.toLowerCase() + '.' + id.toLowerCase();

    if (typeof callback === 'function') {
      callback();
      if (String(callback).indexOf('takeScreenshot') === -1) {
        this.takeScreenshot(currentId);
      }
    } else {
      console.log('No callback found, provide one or nothing will work.');
    }
  }

  /* -----------
   *   Public 
   * -----------
   *
   * Initial constructor which sets the current driver.
   *
   * @TODO: 
   * - Add support for different browsers
   *
   **/
  function Gengar(id, callback) {
    this.id = id;
    this.driver = new webdriver.Builder().forBrowser('firefox').build();

    if (typeof callback === 'function') {
      callback(this, state.bind(this));
    } else {
      console.log('No function received, what do you expect me to run?');
    }
  };

  Gengar.prototype.goTo = function(url) {
    url = url || '';

    this.driver.get(PATH + url);
  }

  Gengar.prototype.getElementById = function(id) {
    // console.log('getElementById: ', id);
    return this.driver.findElement(By.id(id));
  }

  Gengar.prototype.getElementByClassName = function(className) {
    // console.log('getElementsByClassName: ', className);
    return this.driver.findElement(By.className(className));
  }

  Gengar.prototype.getElementByTagName = function(tagName) {
    // console.log('getElementByTagName: ', tagName);
    return this.driver.findElement(By.tagName(tagName));
  }

  Gengar.prototype.getElementByCSS = function(query) {
    // console.log('getElementByCSS: ', query);
    return this.driver.findElement(By.css(query));
  }

  Gengar.prototype.takeScreenshot = function(id, element) {
    // console.log('takeScreenshot: ', id, element);
    let cropInfo;

    if (element) {
      element.getSize().then(function(size) {
        cropInfo = size;
      });
    }

    this.driver.takeScreenshot().then(function(data) {
      saveScreenshot(id.toLowerCase(), data, cropInfo);
    });
  }

  Gengar.prototype.wait = function(time) {
    // console.log('wait: ', time);
    this.driver.sleep(time);
  }

  Gengar.prototype.waitUntilTitleIs = function(title) {
    // console.log('waitUntilTitleIs: ', title);
    this.driver.wait(until.titleIs(title), 1000);
  }

  Gengar.prototype.hover = function(element) {
    // console.log('hover over: ', element);
    this.driver
      .actions()
      .mouseMove(element)
      .perform();
  }

  Gengar.prototype.exit = function() {
    // console.log('exit');
    this.driver.quit();
  }

  return Gengar;
})();

