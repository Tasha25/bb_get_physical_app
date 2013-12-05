App.Views.Main = Backbone.View.extend({

  el: "#main",

  events: {
    "click #new"      : "new",
    "click #random"   : "workout"
  },

  new: function(){
    App.router.navigate('exercises/new', {trigger: true});
  },

  workout: function(){
    App.router.navigate('exercises/workout', {trigger: true});
  }
});
