
module.exports = Helpers = (() => {
  'use strict';
  const Helpers = {};

  Helpers.login = function login(g) {
    g.wait(500);
    g.goToSecure('login');

    // Fill form
    let email = g.getElementById('email_input');
    email.sendKeys('prepaid5@blocket.se');

    let password = g.getElementById('password_input');
    password.sendKeys('123123123');

    g.wait(500);

    // Submit form
    password.submit();
  }

  Helpers.logout = function logout(g) {
    g.getElementByClassName('header-userLogout').click();
    g.wait(500);
  }

  return Helpers;
})();


