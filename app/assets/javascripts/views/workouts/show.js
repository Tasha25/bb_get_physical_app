App.Views.Workout = Backbone.View.extend({

  className: "view",
  template: HandlebarsTemplates['workouts/show'],

  events: {
    "click #save"   : "save"
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var workout = { exercises: this.collection.toJSON(), total: this.collection.calorieCount() }
    this.$el.html( this.template(workout) );
    $('#main').append(this.el);
    return this;
  },

  save: function(){
    $.ajax({
      url: "/workouts",
      type: "post",
      data: { exercise_ids: this.collection.pluck('id') }
    }).done(function(response){
      console.log(response);
    });
  }

});
