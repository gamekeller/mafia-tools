define([
  'lib/util',
  'lodash',
  'jquery'
], function(util, _, $) {

  return {
    assignRolesToPlayers: function(players, roles) {
      var dfd = $.Deferred();
      var request = $.ajax('https://www.random.org/sequences/?min=0&max=' + (roles.length - 1) + '&col=1&format=plain&rnd=new');

      request.done(function(data) {
        var result = {};
        var arr = [];
        data = util.parseIntForArray(util.parseNewlineList(data));

        _.forEach(data, function(newIndex, index) {
          arr[newIndex] = roles[index];
        });

        _.forEach(players, function(player, index) {
          result[player] = arr[index];
        });

        dfd.resolve(result);
      });

      request.fail(function() {
        dfd.reject.apply(null, arguments);
      });

      return dfd.promise();
    }
  };

});