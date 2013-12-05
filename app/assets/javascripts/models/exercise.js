App.Models.Exercise = Backbone.Model.extend({

  urlRoot: "/exercises",

  defaults: {
    difficulty: 1,
    name: "nothing",
    calories: 0
  }

});
