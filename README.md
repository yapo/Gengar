# Gengar [wip]

To run Gengar you need:

	Java     -> https://java.com/en/download/
	Selenium -> http://www.seleniumhq.org/download/

With Selenium installed, make it run with:

	java -jar selenium-server-standalone-2.45.0.jar

And then run your tests.


## File Structure/Architecture
	

	tests/viewName/
		-> viewName.view.js
		-> componentName.component.js

	images/viewName/
		-> viewName.[base/diff/current].png
		-> componentName/
			-> componentName.[base/diff/current].png

## Current Test Structure [wip]

	Gengar('viewName', () -> {
		state('stateName', () -> {
			// Actions
		});
	});

## Action List

	goTo(url)
	getElementById(id)
	getElementByClassName(className)
	takeScreenshot(screenshotName)
	waitUntilTitleIs(title)
	hover(element)

	exit();

Todo:
	
	* Improve this readme
	* Add image diffing with ImageMagick
	* Add a web interface/viewer to see and manage differences

