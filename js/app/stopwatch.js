define([
  'lib/stopwatch'
], function(Timer) {

  // Instantiate the timer
  new Timer($('#stopwatch-start'), $('#stopwatch-reset'), $('#stopwatch-minutes'), $('#stopwatch-seconds'));

  // Volume select
  var $volumeSelect = $('#stopwatch-volume');
  var volume = localStorage.getItem('volume');

  $volumeSelect.children().each(function() {
    if(this.value == volume) {
      this.selected = true;
    }
  });

  $('#stopwatch-volume').on('change', function(e) {
    window.timer.volume = parseFloat($(this).val());
  });

});