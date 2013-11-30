$(function(){
  
  // page load effect alla nprogress
  var $body = $('body'),
    barritaBody = $body.barrita().data('barrita');

  setTimeout(function(){
    barritaBody.done();
  }, 1500);

});