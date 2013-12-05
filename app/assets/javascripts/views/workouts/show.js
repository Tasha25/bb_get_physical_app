App.Views.Workout = Backbone.View.extend({

  className: "view",
  template: HandlebarsTemplates['workouts/show'],

  events: {
    "click #save"   : "save",
    "click #cancel" : "cancel"
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var workout = { exercises: this.collection.toJSON(), total: this.collection.calorieCount() }
    this.$el.html( this.template(workout) );
    $('#detail').html( this.el );
    return this;
  },

  save: function(){
    var workoutView = this;
    $.ajax({
      url: "/workouts",
      type: "post",
      data: { exercise_ids: this.collection.pluck('id') }
    }).done(function(response){
      workoutView.remove();
      App.router.navigate('exercises');
    });
  },

  cancel: function(e){
    e.preventDefault();
    this.remove();
    App.router.navigate("exercises");
  }

});
