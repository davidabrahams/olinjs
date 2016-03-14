$("#login_form").submit(function(event) {
  event.preventDefault();
  var username = $("#username").val();
  var password = $("#password").val();
  $.post("/login", {username: username, password: password})
    .done(function(response) { window.location.href = response.redirect; })
    .error(function(err) { $("#error_message").text(err.responseText);
                           $("#error_message").show();
                         }
  );
});

$("#create_user").click(function () {
  var username = $("#username").val();
  var password = $("#password").val();
  $.post("/register", {username: username, password: password})
    .done(function(response) { window.location.href = response.redirect; })
    .error(function(err) { $("#error_message").text(err.responseText);
                           $("#error_message").show();
                         } // different from how you use curly braces in your serverside routes...
    );
});
