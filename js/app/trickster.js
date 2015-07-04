define([
  'jquery'
], function($) {
  var actions = {
    normal: [
      'wird hypnotisiert.',
      'wird aufgedeckt.',
      'wird in der Nacht gerettet.',
      'bekommt eine Rüstung.',
      'wird eingesperrt.',
      'bekommt eine Bombe angehängt, die hochgeht, wenn der Trickster stribt.',
      'sieht in der Nacht aus wie ein Bürger für den Cop.',
      'sieht in der Nacht aus wie ein Mafiosi für den Cop.',
      'wird zum Kultmitglied, sollte der Trickster sterben stirbt das Opfer auch.',
      'wird zum Vampir, sollte der Trickster sterben stirbt das Opfer auch.',
      'riecht Gas, sollte das Opfer schon einmal Gas gerochen heben wird es entzündet.',
      'wird getötet.',
      'passiert nix.'
    ],
    special: [
      'Opfer Eins wird mit Opfer Zwei verkupplet.',
      'Opfer Eins erfährt was Opfer Zwei Rolle ist.',
      'Opfer Eins und Opfer Zwei werden vertauscht.'
    ]
  };

  var isGenerating = false;
  var $btn = $('#trickster-generate');
  var $one = $('#trickster-victim-one');
  var $two = $('#trickster-victim-two');

  function generate() {
    var dfd = $.Deferred();

    $.get('https://www.random.org/integers/?num=1&min=0&max=13&col=1&base=10&format=plain&rnd=new', function(data) {
      if(parseInt(data) === 13) {
        $.get('https://www.random.org/integers/?num=1&min=0&max=2&col=1&base=10&format=plain&rnd=new', function(data3) {
          dfd.resolve(actions.special[parseInt(data3)], '');
        }).fail(dfd.reject);
      } else {
        $.get('https://www.random.org/integers/?num=1&min=0&max=12&col=1&base=10&format=plain&rnd=new', function(data2) {
          dfd.resolve('Opfer Eins ' + actions.normal[parseInt(data)], 'Opfer Zwei ' + actions.normal[parseInt(data2)]);
        }).fail(dfd.reject);
      }
    }).fail(dfd.reject);

    return dfd.promise();
  }

  $btn.on('click', function() {
    if(isGenerating) return;
    isGenerating = true;

    $btn.addClass('btn-primary').removeClass('btn-danger').button('loading');

    generate()
      .done(function(oneText, twoText) {
        $one.text(oneText);
        $two.text(twoText);
        $btn.button('reset');
      })
      .fail(function() {
        $btn.toggleClass('btn-primary btn-danger').button('failed');
      })
      .always(function() {
        isGenerating = false;
      });
  });

});