function post(path, params, method) {
  method = method || "post"; // Set method to post by default if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
      if(params.hasOwnProperty(key)) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);

          form.appendChild(hiddenField);
       }
  }
  document.body.appendChild(form);
  form.submit();
}

$("#login_form").submit(function(event) {
  console.log("hello")
  event.preventDefault();
  var username = $("#username").val();
  var password = $("#password").val();
  $.ajax({ url: "/login",
            type: 'POST',
            data: {username: username, password: password},
            success: function(response) {
              window.location.href = response.redirect;
            },
            error: function(jqXHR, textStatus, errorThrown) {
              $("#error_message").text(jqXHR.responseText);
              $("#error_message").show();
            }
  });
});

$("#create_user").click(function () {
  var username = $("#username").val();
  var password = $("#password").val();
  $.ajax({ url: "/register",
            type: 'POST',
            data: {username: username, password: password},
            success: function(response) {
              window.location.href = response.redirect;
            },
            error: function(err) {
              $("#error_message").text(err);
              $("#error_message").show();
            }
  });
});
