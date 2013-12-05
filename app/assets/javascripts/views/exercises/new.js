App.Views.ExerciseNew = Backbone.View.extend({

  className: 'view',

  events: {
    "change input, select"      : "change",
    "click input[type=submit]"  : "create",
    "click #cancel"             : "cancel"
  },

  initialize: function(){
    this.model = new App.Models.Exercise();
    this.template = Handlebars.compile( $('#exercises-new-template').html() );
    this.render();
    $('body').append( this.el );
  },

  render: function(){
    this.$el.html( this.template() );
  },

  change: function(e){
    var attributes = {};
    var attr = $(e.currentTarget).attr('name')
    attributes[attr] = $(e.currentTarget).val();
    this.model.set(attributes);
  },

  create: function(e){
    e.preventDefault();
    this.model.save();
    this.remove();
    App.router.navigate("", {trigger: true});
  },

  cancel: function(e){
    e.preventDefault();
    this.remove();
    App.router.navigate("", {trigger: true});
  }

});
