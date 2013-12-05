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
  url: "/exercises",
  sample: function(n){
    return _.sample(this.models, n)
  },
  calorieCount: function(){
    return _.reduce(this.pluck("calories"), function(memo, num){ return memo + num })
  }
});

// Views
//// Collection View
App.Views.Exercises = Backbone.View.extend({

  className : "view",

  events: {
    "click #new"    : "new",
    "click #random" : "workout"
  },

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

App.Views.Workouts = Backbone.View.extend({
  className: "view",

  events: {
    "click #save"   : "save"
  },

  initialize: function(){
    this.template = Handlebars.compile( $('#workouts-template').html() );
    $('#exercises').html( this.render().el) ;
    $('#total').html( this.collection.calorieCount() );
  },
  render: function(){
    this.$el.html( this.template({ workouts: this.collection.toJSON() }) );
    return this;
  },
  save: function(){
    $.ajax({
      url: "/workouts",
      type: "post",
      data: {
        exercise_ids: this.collection.pluck('id')
      }
    }).done(function(response){
      console.log(response);
    })
  }
});

// Routers
App.Router = Backbone.Router.extend({
  initialize: function(){
    this.exercises = new App.Collections.Exercises();
  },
  routes: {
    ""                    : "index",
    "exercises/new"       : "new",
    "exercises/workout"   : "getWorkouts"
  },
  index: function(){
    this.exercises.fetch();
    App.view = new App.Views.Exercises({collection: this.exercises});
  },
  new: function(){
    App.view = new App.Views.ExerciseNew();
  },
  getWorkouts: function(){
    var workouts = new App.Collections.Exercises( this.exercises.sample(3) );
    App.view = new App.Views.Workouts({collection: workouts});
  }
})

// DOM Ready
$(document).ready(function(){
  App.router = new App.Router();
  App.router.navigate("", {trigger: true});
  Backbone.history.start();
});
