
var ajax = function(params) {
  var xhr = new XMLHttpRequest();

  params.method = params.method || 'POST';
  params.data = params.data || '';

  if (!params.url && !params.success) {
    throw new Error('No url passed, cant request.');
  }

  xhr.open(params.method, encodeURI(params.url));

  xhr.onload = function() {
    if (xhr.status === 200) {
      params.success(xhr.responseText);
    } else if (params.error) {
      params.error(xhr);
    }
  };

  xhr.send(params.data);
}

