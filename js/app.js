require.config({
  paths: {
    'lodash': '//cdn.jsdelivr.net/lodash/2.4.1/lodash.min',
    'jquery': '//cdn.jsdelivr.net/jquery/2.1.0/jquery.min',
    'jquery.bootstrap': '//cdn.jsdelivr.net/bootstrap/3.1.1/js/bootstrap.min',
    'mousetrap': '//cdn.jsdelivr.net/mousetrap/1.4.6/mousetrap.min',
    'howler': '//cdn.jsdelivr.net/howler.js/1.1.19/howler.min'
  },
  shim: {
    'jquery.bootstrap': {
      deps: ['jquery']
    }
  }
});

require(['app/assignment', 'app/docs', 'app/stopwatch']);