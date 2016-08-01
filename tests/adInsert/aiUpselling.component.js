
const Gengar = require('../../Gengar');
const Helpers = require('../../Helpers');

const login = Helpers.login;
const logout = Helpers.logout;

new Gengar('aiUpselling', (g, state) => {
  'use strict';

  function steps() {
    g.goToPHP('/ai');
    
    // Choose the others category
    g.waitUntilTitleIs('Insertar un aviso | yapo.cl');
    g.wait(1000);
    g.getElementById('category_group').click();
    g.getElementById('cat8020').click();
    
    // The upselling animation takes at least 500ms
    g.wait(500);
  }

  state('default', () => {
    login(g);
    steps();

    let aiUpselling = g.getElementByClassName('aiUpselling');
    g.takeScreenshot('aiUpselling.default', aiUpselling);

    logout(g);
  });

  state('expanded', () => {
    login(g);
    steps();

    g.getElementById('standard').click();
    g.wait(500);

    let aiUpselling = g.getElementByClassName('aiUpselling');
    g.takeScreenshot('aiUpselling.expanded', aiUpselling);

    logout(g);
  });
});

