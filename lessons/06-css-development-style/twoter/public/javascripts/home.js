$("#twote_form").submit(function(event) {
  event.preventDefault();
  var text = $("#twote_input_text").val();
  $.post("/twote", {twote_text: text})
    .done(function(response) {
      console.log(response);
      $("#twote_div").prepend(Handlebars.templates['twot.hbs'](response.twote));
    })
    .error(function(err) { }
  );
});

$("#checkbox_group").on("change", ":checkbox", function (event) {
  var selected_ids = $("#checkbox_group").find('input:checkbox:checked').map(function() {
    return this.id;
  }).get();
  $.get("/twote", {user_ids: selected_ids})
  .done(function (response) {
    $("#twote_div").empty();
    response.twotes.forEach(function (twote) {
      $("#twote_div").append(Handlebars.templates['twot.hbs'](twote));
    });
  })
  .error(function (err) {});
});
