const Gengar = require('../../Gengar');

new Gengar('adInsert', (g, state) => {
  state('default', () => {
    g.goToPHP('/ai');
  });
});

