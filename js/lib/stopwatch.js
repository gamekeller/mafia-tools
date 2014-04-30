define([
  'lib/util',
  'howler',
  'lodash',
  'jquery',
  'jquery.bootstrap'
], function(util, Howler, _, $) {

  if(!localStorage.getItem('volume')) {
    localStorage.setItem('volume', 0.25);
  }

  window.timer = {
    get volume() {
      return localStorage.getItem('volume');
    },
    set volume(x) {
      localStorage.setItem('volume', x);
      _.forEach(this.sounds, function(sound) {
        sound.volume(x);
      });
    },
    sounds: []
  };

  _.times(11, function(i) {
    timer.sounds.push(new Howler.Howl({
      urls: ['./sounds/' + i + '.ogg'],
      volume: localStorage.getItem('volume')
    }));
  });

  var Timer = function(startBtn, resetBtn, minsField, secsField) {
    this.$startBtn = startBtn;
    this.$resetBtn = resetBtn;
    this.$minsField = minsField;
    this.$secsField = secsField;

    this.active = false;
    this.interval = 0;
    this.entered = 0;
    this.current = 0;

    this.setup();
  };

  Timer.prototype.setup = function() {
    this.$startBtn.on('click', _.bind(function() {
      if(this.active) {
        this.pause();
      } else {
        this.start(this.$minsField.val(), this.$secsField.val());
      }
    }, this));

    this.$resetBtn.on('click', _.bindKey(this, 'reset'));
  };

  Timer.prototype.start = function(mins, secs) {
    var fresh = util.convertTimeToSeconds({ minutes: mins, seconds: secs });

    if(fresh !== this.current) {
      this.current = this.entered = fresh;
    }

    if(!this.current) {
      return;
    }

    if(this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(_.bindKey(this, 'tick'), 1000);

    this.active = true;
    this.$startBtn.button('counting');
    this.updateFields();
  };

  Timer.prototype.pause = function() {
    if(this.interval) {
      clearInterval(this.interval);
    }

    this.active = false;
    this.$startBtn.button('reset');
  };

  Timer.prototype.reset = function() {
    this.pause();
    this.current = this.entered;
    this.updateFields();
  };

  Timer.prototype.updateFields = function() {
    var time = util.convertSecondsToTime(this.current);

    this.$minsField.val(time.minutes);
    this.$secsField.val(time.seconds);
  };

  Timer.prototype.tick = function() {
    if(this.current-- <= 0) {
      clearInterval(this.interval);
      return this.reset();
    }

    if(this.current <= 10 && this.current >= 0) {
      timer.sounds[this.current].play();
    }

    this.updateFields();
  };

  return Timer;

});