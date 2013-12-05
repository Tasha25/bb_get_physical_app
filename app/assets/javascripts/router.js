App.Router = Backbone.Router.extend({

  routes: {
    "exercises"           : "index",
    "exercises/new"       : "new",
    "exercises/workout"   : "getWorkouts"
  },

  initialize: function(){
    new App.Views.Main();
    this.exercises = new App.Collections.Exercises();
  },

  index: function(){
    this.exercises.fetch();
    new App.Views.Exercises({collection: this.exercises});
  },

  new: function(){
    new App.Views.ExerciseNew();
  },

  getWorkouts: function(){
    var workouts = new App.Collections.Exercises( this.exercises.sample(3) );
    new App.Views.Workout({collection: workouts});
  }

});
