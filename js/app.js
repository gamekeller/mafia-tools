require.config({
  paths: {
    'lodash': '//cdn.jsdelivr.net/lodash/3/lodash.min',
    'jquery': '//cdn.jsdelivr.net/jquery/2/jquery.min',
    'jquery.bootstrap': '//cdn.jsdelivr.net/bootstrap/3/js/bootstrap.min',
    'mousetrap': '//cdn.jsdelivr.net/mousetrap/1/mousetrap.min',
    'howler': '//cdn.jsdelivr.net/howler.js/1/howler.min'
  },
  shim: {
    'jquery.bootstrap': {
      deps: ['jquery']
    }
  }
});

require(['app/assignment', 'app/docs', 'app/stopwatch']);