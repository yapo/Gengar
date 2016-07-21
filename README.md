# Gengar [wip]

To run Gengar you need:

	Java     -> https://java.com/en/download/
	Selenium -> http://www.seleniumhq.org/download/

With Selenium installed, make it run with:

	java -jar selenium-server-standalone-2.45.0.jar

And then run your tests with:

	node runner.js


## File Structure/Architecture	

	tests/viewName/
		-> viewName.view.js
		-> componentName.component.js

	images/viewName/
		-> viewName.stateName.[base/diff/current].png
		-> componentName.stateName.[base/diff/current].png
		-> componentName.stateName.diff

## Current Test Structure [wip]

	Gengar('viewName', () -> {
		state('stateName', () -> {
			// Actions
		});
	});

*State will automatically take a screenshot of the whole page if not specified.

###Todo:
	
	* [x] Add image diffing with ImageMagick
	* [ ] Add a web interface/viewer to see and manage differences
	* [ ] Write some nice documentation.
	* [ ] Improve this readme
	* [ ] Make everything installable through npm or some other package manager
	* [ ] Allow for different language "interfaces" (Ruby, Go, Python, whatever)


