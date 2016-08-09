
(function() {

  function getData() {
    ajax({
      url: '/data',
      method: 'GET',
      success: function(data) {
        startApp(JSON.parse(data));
      },
      error: function(err) {
        console.log('Error: ', err);
      }
    });
  }

  function startApp(data) {
    new Vue({
      el: '#app',
      data: {
        list: data,
        base: '',
        new: '',
        diff: ''
      },
      methods: {
        showImages: function(what, why) {
          var image = why + '.' + what.toLowerCase();

          this.base = 'images/' + image + '.base.png';
          this.new = 'images/' + image + '.new.png';
          this.diff = 'images/' + image + '.diff.png';
        },

        changeBase: function(queWea) {
          console.log('queWea: ', queWea);

          ajax({
            url: 'setBase/' + queWea.replace('images/', ''),
            method: 'GET',
            success: function(response) {
              console.log('response: ', response);
              this.base = 'images/' + response;
              this.new = '';
            }
          });
        }
      }
    });

    document.getElementsByClassName('body')[0].className = 'body __show'
  }

  getData();
})();

