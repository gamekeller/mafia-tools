define([
  'lib/util',
  'lib/stopwatch'
], function(util, Timer) {

  var $start = $('#stopwatch-start');
  var $reset = $('#stopwatch-reset');
  var $mins = $('#stopwatch-minutes');
  var $secs = $('#stopwatch-seconds');

  // Instantiate the timer
  var timer = new Timer($start, $reset, $mins, $secs);

  function updateTimer(time) {
    var time = util.convertSecondsToTime(time);

    $mins.val(time.minutes);
    $secs.val(time.seconds);
  }

  // Quickstart buttons
  $('#stopwatch-quickstart').children()
    .on('click', function() {
      if(timer.active) {
        $reset.trigger('click');
      }

      updateTimer($(this).data('time'));
      $start.trigger('click');
    });

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