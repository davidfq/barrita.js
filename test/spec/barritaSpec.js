describe('barrita spec', function() {
  
  var $fixture = $('<div class="fixture"></div>'),
    barrita,
    getPosition = function($el){
      return parseInt($el.css('margin-left').replace(/[^-\d\.]/g, ''));
    };
  
  beforeEach(function() {
    $(document.body).append($fixture);
    barrita = $fixture.barrita().data('barrita');
  });
  
  afterEach(function(){
    $fixture.remove();
  });
  
  describe('setup', function(){
    it('should be a function', function() {
      expect($.isFunction($.barrita)).toBe(true);
    });

    it('should attach object reference (via data attr) to DOM element and make its methods available', function(){
      expect(barrita).not.toBe(null);
      expect($.isFunction(barrita.start)).toBe(true);
      expect($.isFunction(barrita.stop)).toBe(true);
      expect($.isFunction(barrita.inc)).toBe(true);
      expect($.isFunction(barrita.done)).toBe(true);
      expect($.isFunction(barrita.set)).toBe(true);
    });

    it('should add progress UI tmpl to DOM element', function(){
      var tmpl = $('#'+barrita.getId()).find('.barrita__bar');
      expect(tmpl.length).not.toBe(0);
    });
  });
  
  describe('works', function(){
    it('was in autostart mode, so status is greather than zero', function(){      
      expect(barrita.getStatus()).toBeGreaterThan(0);
    });
    
    it('stops and increments', function(){
      var status = barrita.getStatus();      
      barrita.stop();
      expect(status).toBe(barrita.getStatus());
      barrita.inc();
      expect(barrita.getStatus()).toBeGreaterThan(status);
    });
    
    it('gets status 100% when done', function(){
      barrita.done();
      expect(barrita.getStatus()).toBe(100);
    });
    
    it('gets status 0% when stopped and set to zero', function(){
      barrita.set(0);
      expect(barrita.getStatus()).toBe(0);
    });
    
    it('gets status > 0% when started again', function(){
      barrita.start();
      expect(barrita.getStatus()).toBeGreaterThan(0);
    });
    
    it('moves to the right status percent value set', function(){
      for(var i=0; i<10; i++){
        var percent = Math.round(Math.random()*100);
        barrita.set(percent);
        expect(barrita.getStatus()).toBe(percent);        
      }
    });
    
    it('is stopped after status percent value is set', function(){
      barrita.set(0);
      expect(barrita.isStopped()).toBe(true);
    });
  });
  
  describe('tests actual DOM element', function(){
    it('should change DOM element (bar) position', function(){
      var start, end, $bar = $('#'+barrita.getId()).find('.barrita__bar');       
      runs(function() {
        start = getPosition($bar);
        barrita.inc(90);
        setTimeout(function() {
          end = getPosition($bar);
        }, barrita.settings.trickleSpeed);
      });
      
      waitsFor(function() {
        return end > start;
      }, 'end should be bigger than start', barrita.settings.trickleSpeed);
      
      runs(function() {
        expect(end).toBeGreaterThan(start);
      });
    });
  });
});