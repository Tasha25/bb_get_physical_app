// Namespace our variables
var App = {
  Models:      {},
  Collections: {},
  Views:       {}
}

// Models
App.Models.Exercise = Backbone.Model.extend({
  urlRoot: "/exercises",
  defaults: {
    difficulty: 1,
    name: "nothing",
    calories: 0
  }
});

// Collections
App.Collections.Exercises = Backbone.Collection.extend({
  url: "/exercises"
});

// Views
//// Navigation View
App.Views.Navigation = Backbone.View.extend({
  el: "nav",
  events: {
    "click #new" : "new"
  },
  initialize: function(){
    this.$el.addClass('view');
  },
  new: function(){
    App.view.remove();
    App.router.navigate('exercises/new', {trigger: true});
  }
});
//// Collection View
App.Views.Exercises = Backbone.View.extend({

  className : "view",

  initialize: function(){
    this.template = Handlebars.compile( $('#exercises-index-template').html() );
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
  }
});

//// Model Show View
App.Views.Exercise = Backbone.View.extend({

  tagName   : "li",
  className : "view",

  events: {
    "click .remove" : "destroy"
  },

  initialize: function(){
    this.template = Handlebars.compile( $('#exercise-show-template').html() );
    this.render();
  },

  render: function(){
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  },

  destroy: function(){
    this.model.destroy();
    this.remove();
  }
});

//// Model New View
App.Views.ExerciseNew = Backbone.View.extend({

  events: {
    "change input, select"      : "change",
    "click input[type=submit]"  : "create"
  },

  initialize: function(){
    this.template = Handlebars.compile( $('#exercises-new-template').html() );
    this.render();
    $('body').append( this.el );
    this.listenTo(this.model, "save", this.remove);
  },

  render: function(){
    this.$el.html( this.template() );
    this.$el.addClass( 'view ');
  },

  change: function(e){
    var attributes = {};
    var attr = $(e.currentTarget).attr('name')
    attributes[attr] = $(e.currentTarget).val();
    this.model.set(attributes);
  },

  create: function(e){
    this.model.save();
    App.router.navigate("", {trigger: true});
  }
});

// Routers
App.Router = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start();
  },
  routes: {
    ""              : "index",
    "exercises/new" : "new"
  },
  index: function(){
    var exercises = new App.Collections.Exercises();
    exercises.fetch();
    App.view = new App.Views.Exercises({collection: exercises});
  },
  new: function(){
    var newExercise = new App.Models.Exercise();
    App.view = new App.Views.ExerciseNew({model: newExercise});
  }
})

// DOM Ready
$(document).ready(function(){
  App.router = new App.Router();
  App.nav = new App.Views.Navigation();
});
