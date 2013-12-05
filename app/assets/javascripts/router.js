App.Router = Backbone.Router.extend({

  routes: {
    ""                    : "index",
    "exercises/new"       : "new",
    "exercises/workout"   : "getWorkouts"
  },

  initialize: function(){
    this.exercises = new App.Collections.Exercises();
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
    App.view = new App.Views.Workout({collection: workouts});
  }

});
