$("#twote_form").submit(function(event) {
  event.preventDefault();
  var text = $("#twote_text").val();
  $.post("twote", {twote_text: text})
    .done(function(response) {
      console.log(response);
      $("#twote_div").prepend(Handlebars.templates['twot.hbs'](response));
    })
    .error(function(err) { }
  );
});
