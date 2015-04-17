define([
  'jquery',
  'underscore',
  'backbone',
  'views/siteInfo',
  'views/siteSimilar',
  'text!templates/alert-error.html'
], function ($, _, Backbone, SiteInfoView, SiteSimilarView, errorTpl) {

  return Backbone.View.extend({
    el: '#app-container',
    events: {
      'submit #header-search-form': 'urlSubmit'
    },
    templates: {
      error: _.template(errorTpl)
    },
    initialize: function() {
      this.$searchField = this.$('#header-search');
      this.$searchCol = this.$('#search-col');
      this.$siteFrame = this.$('#site-frame');
      this.$siteInfo = this.$('#site-info-wrapper');
      this.$siteSimilar = this.$('#site-similar-wrapper');

      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'syncError', this.renderError, this);
    },
    render: function() {
      this.$siteInfo.html(new SiteInfoView({model: this.model}).render().$el);
      this.$siteSimilar.html(new SiteSimilarView({model: this.model}).render().$el);

      // remove fullsize for searchbar
      this.$searchCol
        .removeClass('col-md-12')
        .addClass('col-md-6');

      this.$searchField.removeAttr('disabled');
      this.siteFrameHeightSet();
      this.siteFrameUrlSet(this.model.params.urlForSearch);

      return this;
    },
    urlSubmit: function() {
      var val = this.$searchField.val();

      this.$searchField.attr('disabled', 'disabled');
      this.model.search(val);

      return false;
    },
    siteFrameUrlSet: function(url) {
      // clear iframe. if new url loading will fail, we have clear iframe
      this.$siteFrame.attr('src', 'about:blank');

      // gives iframe time for clearing and then try to load new url.
      setTimeout(function() {
        this.$siteFrame.attr('src', 'http://' + url);
      }.bind(this), 1000);
    },
    siteFrameHeightSet: function() {
      // get main column height.
      var searchColHeight = this.$searchCol.css('height');

      // set iframe height equal main column when iframe loaded
      this.$siteFrame.load(function() {
        $(this).css({'height': searchColHeight, 'display': 'block'});
      });
    },
    renderError: function(url) {
      var message = 'site ' + url + ' not found',
        html = this.templates.error({message: message});

      // clear similar block, hide iframe, set active input
      this.$siteSimilar.html('');
      this.$siteFrame.hide();
      this.$searchField.removeAttr('disabled');

      // set fullsize for searchbar
      this.$searchCol
        .removeClass('col-md-6')
        .addClass('col-md-12');

      this.$siteInfo.html(html);
    }
  });
});