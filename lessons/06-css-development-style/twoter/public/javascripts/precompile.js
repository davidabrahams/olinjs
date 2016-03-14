// Some documentation about what this file is and how it works might be nice! Clientside templating, yes?
// Also, the nested ternary logic, strings of HTML, etc. look kind of scary/difficult to maintain -- did you write them or get them somewhere?
// If you wrote them, could they be organized any more understandably?
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twot.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	    "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._creator : depth0)) != null ? stack1.facebook : stack1)) != null ? stack1.name : stack1), depth0))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	    "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._creator : depth0)) != null ? stack1.username : stack1), depth0))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<article>\n\n<div class=\"twote_text\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</div>\n<br>\n<div class=\"twote_username\">\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0._creator : depth0)) != null ? stack1.facebook : stack1)) != null ? stack1.id : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n\n</article>\n";
},"useData":true});
})();
