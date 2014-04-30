define([
  'mousetrap',
  'lodash',
  'jquery',
  'jquery.bootstrap'
], function(Mousetrap, _, $) {

  // Selectors
  var $docs = $('#documentation');

  // States
  var docsShown = false;

  // Methods
  var toggleDocumentation = function() {
    $docs.toggleClass('hide', docsShown);
    docsShown = !docsShown;
  };

  // Events
  $(window).on('message', function(e) {
    if(e.originalEvent.data !== 'keydown:27') {
      return;
    }

    toggleDocumentation();
  });
  Mousetrap.bind('esc', toggleDocumentation);

});