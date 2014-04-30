define([
  'lib/util',
  'lib/mafia',
  'mousetrap',
  'lodash',
  'jquery',
  'jquery.bootstrap'
], function(util, mafia, Mousetrap, _, $) {

  // Selectors
  var $container = $('#assignment');
  var $btn = $('#assign');
  var $players = $('#players');
  var $roles = $('#roles');
  var $output = $('#output');

  // Methods
  var doAssign = function() {
    if(!$container.hasClass('active')) {
      return;
    }

    var players = util.parseNewlineList($players.val());
    var roles = util.parseNewlineList($roles.val());

    if(!players.length && !roles.length) {
      return alert('Leere Eingabe.');
    }

    if(players.length !== roles.length) {
      return alert('Die Anzahl an Spielern und Rollen stimmen nicht überein.');
    }

    if(players.length === 1) {
      return alert('Muss mehr als ein Spieler sein.');
    }

    $output.addClass('hide').empty();
    $btn.addClass('btn-primary').removeClass('btn-danger').button('loading');

    mafia.assignRolesToPlayers(players, roles)
      .done(function(assignments) {
        _.forEach(assignments, function(role, player) {
          $output.append('<input type="checkbox">' + player + ' - ' + role + '\n');
        });
        $output.removeClass('hide');
        $btn.button('reset');
      })
      .fail(function() {
        $btn.toggleClass('btn-primary btn-danger').button('failed');
      });
  };

  // Events
  $btn.on('click', doAssign);
  Mousetrap.bind(['command+enter', 'ctrl+enter'], doAssign);

});