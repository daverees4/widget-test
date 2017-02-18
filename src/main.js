define([
  'require',
  './helpers',
  'i18n!./nls/strings',
  'text!compiled/css/main.css',
  'rv!templates/index'
], function(require, helpers, strings, css, template ) {

  var Ractive = require("Ractive");


  if( css ) {
    helpers.addCssToDocument(css);
  }
  
  var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

var scdata;

getJSON('http://stagecast.net/admin/web/index.php?r=api/video&videoId=fSBH5MzdWn',
function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    scdata=data;
    console.log(data)
  }
});
  

  return function(opts) {
    var view = new Ractive({
      el: opts.el,
      template: template,
      data: { message: strings.hello + " Dave" }
    });
  };
});
