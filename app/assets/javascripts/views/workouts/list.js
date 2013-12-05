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
      data: { exercise_ids: this.collection.pluck('id') }
    }).done(function(response){
      console.log(response);
    });
  }

});
