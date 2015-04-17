define([
  'underscore',
  'backbone'
], function (_, Backbone) {

  return Backbone.Model.extend({
    params: {
      urlForSearch: null
    },
    url: function() {
      return 'http://api.similarweb.com/site/' + this.params.urlForSearch +
        '/rankoverview?userkey=a6fd04d833f2c28ce7c30dc957bf481e&format=json';
    },
    urlParse: function(url) {
      // remove unnecessary elements from url
      var regex = /http:|https:|www.|\/|\/\/+/g;

      return url.replace(regex, '');
    },
    urlValidate: function(url) {
      var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

      return url.match(regex);
    },
    search: function(url) {
      url = this.urlParse(url);
      this.params.urlForSearch = url;

      var onErrorHandler = function(model) {
        model.trigger('syncError', {url: url, message: 'not found'});
      };

      var onSuccessHandler = function(model) {
        model.set('Domain', model.params.urlForSearch);
      };

      this.fetch({
        success: onSuccessHandler,
        error: onErrorHandler
      });
    }
  });
});