(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twot.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<p>\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.twote : depth0)) != null ? stack1.text : stack1), depth0))
    + " <br>\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "\n\n</p>\n";
},"useData":true});
})();