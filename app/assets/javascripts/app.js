// Namespace our variables
var App = {
  Models:      {},
  Collections: {},
  Views:       {}
}

// DOM Ready
$(document).ready(function(){
  App.router = new App.Router();
  App.router.navigate("", {trigger: true});
  Backbone.history.start();
});
