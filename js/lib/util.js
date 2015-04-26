define([
  'lodash'
], function(_) {

  return {
    parseNewlineList: function(text) {
      return _.compact(text.split('\n'));
    },
    parseIntForArray: function(arr) {
      return _.map(arr, function(data) { return _.parseInt(data, 10); });
    },
    convertSecondsToTime: function(s, addZeros) {
      s = _.parseInt(s, 10);
      var minutes = ~~(s / 60);
      var seconds = s - (minutes * 60);
      addZeros = _.isBoolean(addZeros) ? addZeros : true;

      return _.transform({ minutes: minutes, seconds: seconds }, function(result, num, key) {
        result[key] = (num < 10 && addZeros ? '0' : '') + num;
      });
    },
    convertTimeToSeconds: function(time) {
      var s = 0;

      _.times(_.parseInt(time.minutes), function() { s += 60; });
      _.times(_.parseInt(time.seconds), function() { s++; });

      return s;
    }
  };

});