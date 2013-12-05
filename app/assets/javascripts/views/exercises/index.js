App.Views.Exercises = Backbone.View.extend({

  className : "view",

  template: HandlebarsTemplates['exercises/index'],

  events: {
    "click #new"    : "new",
    "click #random" : "workout"
  },

  initialize: function(){
    this.render();
    this.listenTo(this.collection, "sync", this.render);
    $('body').append(this.el);
  },

  render: function(){
    this.$el.html( this.template() );
    this.collection.each(function(element){
      var exerciseView = new App.Views.Exercise( {model: element} );
      $('#exercises').append( exerciseView.el );
    }, this);
    return this;
  },

  new: function(){
    this.remove();
    App.router.navigate('exercises/new', {trigger: true});
  },

  workout: function(){
    console.log('random');
    App.router.navigate('exercises/workout', {trigger: true});
  }

});
