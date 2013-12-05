App.Views.Exercise = Backbone.View.extend({

  tagName   : "li",
  className : "view",

  events: {
    "click .remove" : "destroy"
  },

  initialize: function(){
    this.template = Handlebars.compile( $('#exercise-show-template').html() );
    this.render();
  },

  render: function(){
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  },

  destroy: function(){
    this.model.destroy();
    this.remove();
  }

});
