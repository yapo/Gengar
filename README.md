# Gengar [wip]

To run Gengar you need:

	Java     -> https://java.com/en/download/
	Selenium -> http://www.seleniumhq.org/download/

With Selenium installed, make it run with:

	java -jar selenium-server-standalone-2.45.0.jar

If running headless, you'll need Xvnc or Xbnc. If using Xvnc, you should run:

	export DISPLAY=:$(id -u)
	nohup Xvnc -ac -SecurityTypes None $DISPLAY & > /dev/null

And then run your tests with:

	node runner.js


## File Structure/Architecture	

	tests/viewName/
		-> viewName.view.js
		-> componentName.component.js

	images/
		-> viewName.stateName.[base/diff/current].png
		-> componentName.stateName.[base/diff/current].png
		-> componentName.stateName.diff

## Current Test Structure [wip]

	new Gengar('viewName', (g, state) -> {
		state('stateName', () -> {
			// Actions
		});
	});

*State will automatically take a screenshot of the whole page if not specified.

###Todo:
	
	* [ ] Write some nice documentation.
	* [ ] Improve this readme
	* [ ] Allow for different language "interfaces" (Ruby, Go, Python, whatever)

###Done:
	* [x] Add image diffing with ImageMagick
	* [x] Add a web interface/viewer to see and manage differences
	* [x] Make everything installable through npm or some other package manager

