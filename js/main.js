'use strict';

requirejs.config({
  baseUrl: './js',
  urlArgs: "dev=" + (new Date()).getTime(),
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
    underscore: '../node_modules/underscore/underscore-min',
    backbone: '../node_modules/backbone/backbone-min',
    text: '../node_modules/requirejs-text/text',
    templates: '../templates'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require([
  'backbone',
  'jquery',
  'models/site',
  'views/app'
], function(Backbone, $, SiteModel, AppView) {
  $(document).ready(function() {
    var site = new SiteModel(),
      appView = new AppView({model: site});
  });
});
