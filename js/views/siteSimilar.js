define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/site-similar.html'
], function ($, _, Backbone, MainTemplate) {

  return Backbone.View.extend({
    id: 'site-similar',
    template: _.template(MainTemplate),
    events: {
      'click .btn': 'siteSet'
    },
    render: function() {
      var data = this.model.attributes.SimilarSites || [];
      this.$el.append(this.template({data: data}));

      return this
    },
    siteSet: function(e) {
      var el = e.currentTarget || event.srcElement,
        url = $(el).data('url');

      this.model.search(url);
    }
  });
});