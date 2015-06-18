TwinkieSetApp.Views.EditForm = Backbone.View.extend({
  template: JST['admin_forms/album_edit'],
  className: 'form-modal',

  initialize: function () {

  },

  events: {
    "submit form": "editAlbum",
    "click .cancel-edit-album": "hideForm",
    'click .status-published': 'setStatusPublished',
    'click .status-draft': 'setStatusDraft'
  },

  setStatusPublished: function () {
    this.$el.find('#album-status').val("Published");
    this.$el.find('.status-published').addClass('selected');
    this.$el.find('.status-draft').removeClass('selected');
  },

  setStatusDraft: function () {
    this.$el.find('#album-status').val("Draft");
    this.$el.find('.status-published').removeClass('selected');
    this.$el.find('.status-draft').addClass('selected');
  },

  hideForm: function () {
    event.preventDefault();
    this.$el.hide();
  },

  editAlbum: function (event) {
    event.preventDefault();
    var attrs = $('form').serializeJSON();
    var editAlbum = this.model;
    editAlbum.save(attrs, {
      success: function () {
        editAlbum.fetch(); // do this to ensure string_date is rendered
        this.$el.hide();
      }.bind(this),
    });
  },

  render: function () {
    var content = this.template({
      album: this.model
    });
    this.$el.html(content);
    this.onRender();
    return this;
  },

  onRender: function () {
    if (this.model.get('status') === 'Draft') {
      this.$el.find('.status-published').removeClass('selected');
      this.$el.find('.status-draft').addClass('selected');
    } else {
      this.$el.find('.status-published').addClass('selected');
      this.$el.find('.status-draft').removeClass('selected');

    }




  }

});
