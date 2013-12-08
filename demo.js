$(function(){
  
  // page load effect alla nprogress
  // var $body = $('body'),
  //   barritaBody = $body.barrita().data('barrita');
  // 
  // setTimeout(function(){
  //   barritaBody.done();
  // }, 1500);

  var $startStop = $('#demo__display_start-stop'),
    $randomInc = $('#demo__display_inc'),
    $setVals = $('#demo__display_set-values'),
    $settings = $('#demo__display_settings');

  $startStop.barrita({
    autoStart : false,
    hideOnDone : false
  });
  
  $randomInc.barrita({
    autoStart : false,
    hideOnDone : false
  });
  
 $setVals.barrita({ autoStart : false });
  
  $settings.barrita({ 
    speed : 2500,
    trickleSpeed : 500,
    hideOnDone : true,
    autoStart : true
  });
  
  $('button').on('click', function(e){
    e.preventDefault();
    var $el = $(this),
      action = $el.data('action'),
      $demo = $el.parents('.demo').find('.demo__display');
    
    $demo.data('barrita')[action]($el.data('arg'));
  });
  
  $('.demo__code-trigger').on('click', function(e){
    e.preventDefault();
    $(this.hash).toggleClass('is-hidden');
  });
});