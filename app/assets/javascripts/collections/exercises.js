App.Collections.Exercises = Backbone.Collection.extend({

  url: "/exercises",

  sample: function(number){
    return _.sample(this.models, number);
  },

  calorieCount: function(){
    var calories = this.pluck("calories");
    var total = _.reduce(calories, function(memo, num){ return memo + num });
    return total;
  }

});
