(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twot.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "<article>\n\n<div class=\"twote_text\">"
    + alias1(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper)))
    + "</div>\n<br>\n<div class=\"twote_username\">"
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0._creator : depth0)) != null ? stack1.username : stack1), depth0))
    + "</div>\n\n</article>\n";
},"useData":true});
})();