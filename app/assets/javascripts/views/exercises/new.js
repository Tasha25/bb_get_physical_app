App.Views.ExerciseNew = Backbone.View.extend({

  className: 'view',

  template: HandlebarsTemplates['exercises/new'],

  events: {
    "change input, select"      : "change",
    "click input[type=submit]"  : "create",
    "click #cancel"             : "cancel"
  },

  initialize: function(){
    this.exercise = {};
    this.render();
    $('#detail').html( this.el );
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  change: function(e){
    var attr = $(e.currentTarget).attr('name');
    this.exercise[attr] = $(e.currentTarget).val();
  },

  create: function(e){
    e.preventDefault();
    App.router.exercises.create( this.exercise );
    this.remove();
    App.router.navigate("exercises");
  },

  cancel: function(e){
    e.preventDefault();
    this.remove();
    App.router.navigate("exercises");
  }

});
