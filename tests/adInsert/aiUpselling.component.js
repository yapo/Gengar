var Gengar = require('../../Gengar');

function login(g) {
  'use strict';

  g.goToSecure('login');
  
  // Fill form
  let email = g.getElementById('email_input');
  email.sendKeys('prepaid5@blocket.se');
  
  let password = g.getElementById('password_input');
  password.sendKeys('123123');
  
  // Submit form
  password.submit();
}

new Gengar('aiUpselling', (g, state) => {
  'use strict';

  state('default', () => {
    login(g);

    g.goToPHP('/ai');
    
    // Choose the others category
    g.waitUntilTitleIs('Insertar un aviso | yapo.cl');
    g.wait(1000);
    g.getElementById('category_group').click();
    g.getElementById('cat8020').click();
    
    // The upselling animation takes at least 500ms
    g.wait(500);

    let aiUpselling = g.getElementByClassName('aiUpselling');
    g.takeScreenshot('aiUpselling.default', aiUpselling);
  });
});

