$(function(){
  
  // test page loading effect
  var $body = $('body');
  $body.barrita({
    hideOnDone: false
  });
  setTimeout(function(){
    $body.data('barrita').done();
  }, 1000);
  
});