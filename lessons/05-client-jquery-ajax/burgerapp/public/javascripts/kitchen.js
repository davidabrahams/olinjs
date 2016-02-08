var $k_table = $("#k_table");

var remove_order = function (event)
{
  var id = $(this).closest("tr").attr('id');
  $.post("kitchen", {id: id})
  .done(function(data, status) {
    var row = $("#" + data._id);
    row.remove();
  })
  .error(onError);
}

var onError = function(data, status) {
  window.alert("An error occurred! :(");
};

$k_table.on("click", ".remove", remove_order);
