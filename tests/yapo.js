var Gengar = require('../Gengar');

/* Test */
Gengar.goTo('http://www.yapo.cl/');
Gengar.takeScreenshot('Home');

Gengar.getElementById('region_name_15').click();
Gengar.takeScreenshot('Listing');

Gengar.getElementByClassName('btn-da-insert').click();
Gengar.waitUntilTitleIs('Insertar un aviso | yapo.cl');
Gengar.takeScreenshot('Ad Insert');
Gengar.exit();

