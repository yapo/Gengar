(() => {
  let enableDebug = false;

  function log(log, msg) {
    if (enableDebug) {
      msg = msg || '';
      console.log('log: ', log, msg);
    }
    return true;
  }

  function checkDebug() {
    enableDebug = false;
    const options = ['--debug', '--debugger', '-d', '-D'];

    process.argv.forEach(function(current) {
      if (options.indexOf(current) > -1) {
        log('Debug mode enabled.');
        enableDebug = true;
      }
    });
  }
})();

