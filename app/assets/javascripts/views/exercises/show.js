App.Views.Exercise = Backbone.View.extend({

  tagName   : "li",
  className : "view",

  template: HandlebarsTemplates['exercises/show'],

  events: {
    "click .remove" : "destroy"
  },

  initialize: function(){
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
