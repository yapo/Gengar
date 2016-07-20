const Gengar = require('../../Gengar.js');

new Gengar('Map', (g, state) => {
  'use strict';

  state('default', () => {
    g.goTo();
  });

  state('hover', () => {
    g.goTo();

    let map = g.getElementById('r14');
    g.hover(map);
  });
});

