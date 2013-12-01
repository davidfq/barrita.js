/*!
 * barrita.js jQuery plugin to create progress bars
 * 
 * heavily inspired by nprogress
 * https://github.com/rstacruz/nprogress
 * © 2013, Rico Sta. Cruz. Released under the MIT License.
 * https://github.com/rstacruz/nprogress/blob/master/License.md
 * 
 */
(function($) {

  $.barrita = function(el, options){

    var barrita = this,
      defaults = {
        container : '<div class="barrita"></div>',
        tmpl : '<div class="barrita__bar" role="bar"></div>',
        trickleRate : 2,
        trickleSpeed : 200,
        max : 94,
        full : 100,
        speed : 400,
        autoStart : true,
        hideOnDone : true
      },
      $barrita = null, 
      $el = $(el),
      id = 'barrita_' + (el.id || new Date().getTime()),
      timeout = null,
      status = null,
      stopped = true;
    
    barrita.settings = {};

    barrita.start = function(){
      if(this.settings.hideOnDone){
        $barrita.show();
      }
      stopped = false;
      $barrita.addClass('barrita_moving');
      barrita.inc();
      work();
    };
    
    barrita.stop = function(){
      stop();
    };
    
    barrita.set = function(n){
      stop();
      if(this.settings.hideOnDone){
        $barrita.show();
      }
      move(n, false);
    };
    
    barrita.inc = function(amount){
      var current = status;
      if(!amount){
        amount = Math.random() * this.settings.trickleRate;
        if(amount < 1){
          amount = amount * 10;
        }     
      }
      status = clamp(current + amount, 0, this.settings.max);
      move(status, true);
    };
    
    barrita.done = function(){
      status = this.settings.full;
      css(0, true);
      if(this.settings.hideOnDone){
        setTimeout(function(){
          $barrita.hide();
        }, this.settings.speed);
      }
      stop();
    };
    
    barrita.getStatus = function(){
      return status;
    };
    
    barrita.isStopped = function(){
      return stopped;
    };
    
    barrita.getId = function(){
      return id;
    };
    
    var stop = function(){
      stopped = true;
      $barrita.removeClass('barrita_moving');
    };
    
    var work = function(){
      timeout = setTimeout(function(){
        if(stopped || status === barrita.settings.full){
          clearTimeout(timeout);
          return;
        }
        barrita.inc();
        work();
      }, barrita.settings.speed);
    };
    
    var clamp = function(n, min, max) {
      if(n < min){
         return min;
      }
      if(n > max){
        return max;
      }
      return n;
    };
    
    var move = function(n, transition){
      status = n;
      if(status >= barrita.settings.full){
        return;
      }else{
        n = '-'+(100 - n)+'%';
      }
      css(n, transition);
    };
    
    var css = function(n, transition){
      var cssObj = { 'margin-left' : n };
      
      if(transition){
        $.extend(cssObj, {
          'transition' : 'all '+barrita.settings.trickleSpeed+'ms linear'
        });
      }

      $barrita.find('[role=bar]').css(cssObj);
    };
    
    var init = function(){
      barrita.settings = $.extend({}, defaults, options);
      $barrita = $(barrita.settings.container);
      $barrita.attr('id', id).html(barrita.settings.tmpl);
      $el.append($barrita);
      
      if(barrita.settings.autoStart){
        barrita.start();
      }else{
        barrita.set(0);
      }
    };
    
    init();
  };
  
  $.fn.barrita = function(options) {
    return this.each(function(){
      var $el = $(this);
      if (undefined === $el.data('barrita')) {
        $el.data('barrita', new $.barrita(this, options));
      }
    });
  };

})(this.jQuery || this.Zepto);
