var Gengar = require('../../Gengar');

/* Test */
new Gengar('Home', (g, state) => {
  state('default', () => {
    g.goTo();
  });
});

