define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/site-info.html'
], function ($, _, Backbone, MainTemplate) {

  return Backbone.View.extend({
    id: 'site-info',
    template: _.template(MainTemplate),
    render: function() {
      var data = this.model.attributes;
      this.$el.append(this.template({data: data}));

      return this
    }
  });
});