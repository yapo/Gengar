
const Gengar = (function() {
	'use strict';

	/* Inner Global Vars */
	const fs = require('fs');
	const webdriver = require('selenium-webdriver');
	const By = webdriver.By;
	const until = webdriver.until;

	/* Private */
	function saveScreenshot(id, data) {
		let base64Data = data.replace(/^data:image\/png;base64,/,'');

		fs.writeFile(id + '.png', base64Data, 'base64', (err) => {
			err ? console.log('err: ', err) : true;
		});
	}
	
	/* Public */
	let Gengar = function() {
		this.driver = new webdriver.Builder().forBrowser('firefox').build();
	};

	Gengar.prototype.goTo = function(url) {
		console.log('Going to: ', url);
		this.driver.get(url);
	}

	Gengar.prototype.getElementById = function(id) {
		console.log('Searching element by id: ', id);
		return this.driver.findElement(By.id(id));
	}

	Gengar.prototype.getElementByClassName = function(className) {
		console.log('Searching element by className: ', className);
		return this.driver.findElement(By.className(className));
	}

	Gengar.prototype.takeScreenshot = function(id) {
		console.log('Taking screenshot: ', id);
		this.driver.takeScreenshot().then(function(data) {
			saveScreenshot(id, data);
		});
	}

	Gengar.prototype.exit = function() {
		console.log('Finished taking screenshots.');
		this.driver.quit();
	}

	Gengar.prototype.waitUntilTitleIs = function(title) {
		console.log('Waiting.');
		this.driver.wait(until.titleIs(title), 1000);
	}

	return new Gengar;
})();

module.exports = Gengar;

