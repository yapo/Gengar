
const Gengar = require('../../Gengar.js');

new Gengar('Map', (g, state) => {
  'use strict';

  state('default', () => {
    g.goTo();

    let mapWrap = g.getElementById('map_wrap');
    g.takeScreenshot('map.default', mapWrap);
  });

  state('hover', () => {
    g.goTo();

    let mapWrap = g.getElementById('map_wrap');
    let map = g.getElementById('r14');

    g.hover(map);
    g.takeScreenshot('map.hover', mapWrap);
  });
});

