App.Views.Exercises = Backbone.View.extend({

  tagName : "ul",
  className: "view",

  template: HandlebarsTemplates['exercises/index'],

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
    this.render();
  },

  render: function(){
    this.$el.html( this.template() );
    this.collection.each(function(element){
      var exerciseView = new App.Views.Exercise( {model: element} );
      this.$el.append( exerciseView.el );
    }, this);
    $('#exercises').append( this.$el );
    return this;
  }

});
