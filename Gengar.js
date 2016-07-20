
const Gengar = (() => {
  'use strict';

  /* Inner Global Vars */
  const fs = require('fs');
  const webdriver = require('selenium-webdriver');
  const By = webdriver.By;
  const until = webdriver.until;

  const PATH = JSON.parse(fs.readFileSync('gengar.json'))['PATH'];

  /* Private */
  function saveScreenshot(id, data) {
    let base64Data = data.replace(/^data:image\/png;base64,/,'');
    let suffix = '.base';
    let images = fs.readdirSync('images/');

    // Find if there's already an image to compare to
    let already = images.find(function(elm) {
      if (elm === id + '.base.png') {
        suffix = '.diff';
        return true;
      }
    }) || false;

    if (already) {
      // console.log('hola');
    } else {
      // console.log('chao');
    }

    fs.writeFile('images/' + id + suffix + '.png', base64Data, 'base64', (err) => {
      if (err) {
        // console.log('err: ', err)
      } else {
        // console.log('id: ', id);
      }
    });
  }

  function state(id, callback) {
    if (typeof callback === 'function') {
      callback();
      this.takeScreenshot(this.id.toLowerCase() + '.' + id.toLowerCase());
    } else {
      console.log('No callback found, provide one or nothing will work.');
    }
  }

  /* Public */
  /*
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
      // console.log('No function, what do you expect me to run?');
    }
  };

  Gengar.prototype.goTo = function(url) {
    // console.log('goTo: ', PATH + url);
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

  Gengar.prototype.takeScreenshot = function(id) {
    // console.log('takeScreenshot: ', id);
    this.driver.takeScreenshot().then(function(data) {
      saveScreenshot(id, data);
    });
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

module.exports = Gengar;

