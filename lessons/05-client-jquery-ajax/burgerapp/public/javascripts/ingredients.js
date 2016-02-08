var $add_form = $("#add_form");
var $edit_form = $("#edit_form");
var $table = $("#i_table");


var onPostSuccess = function(data, status) {
  var html = Handlebars.templates['table_row.hbs'](data);
  $('#i_table tr:last').after(html);
  $add_form.trigger('reset');
};

var onError = function(data, status) {
  window.alert("An error occurred! :(");
};

var update_stock = function (s, t) {
  var id = t.closest("tr").attr('id');
  $.post("ingredients/outofstock", {id: id, stock:s})
  .done(function(data, status) {
    var row = $("#" + data._id);
    var h = Handlebars.templates['table_row.hbs'](data);
    row.replaceWith(h);
  })
  .error(onError);
};

var edit_button_click = function () {
  $add_form.hide();
  $edit_form.show();
  var row = $(this).closest("tr");
  var id = row.attr('id');
  $edit_form.find("[name='name']").val(row.find('td').eq(0).text())
  $edit_form.find("[name='price']").val(row.find('td').eq(1).text())
  $("#selected").val(id);
};

$add_form.submit(function(event) {
  event.preventDefault();
  var name = $add_form.find("[name='name']").val();
  var price = $add_form.find("[name='price']").val();
  $.post("ingredients", {
    name: name,
    price: price
  })
  .done(onPostSuccess)
  .error(onError);
});

$edit_form.submit(function(event) {
  event.preventDefault();
  var name = $edit_form.find("[name='name']").val();
  var price = $edit_form.find("[name='price']").val();
  var id = $('#selected').val();
  $.post("ingredients/edit", {
    name: name,
    price: price,
    id: id
  })
  .done(function(data, status) {
    var row = $("#" + data._id);
    var h = Handlebars.templates['table_row.hbs'](data);
    row.replaceWith(h);
    $add_form.show();
    $edit_form.hide();
  })
  .error(onError);
});

$edit_form.on('reset', function(e)
{
  $add_form.show();
  $edit_form.hide();
});

$("#i_table").on("click", ".out_of_stock", function (event) {update_stock(false,
  $(this))});
$("#i_table").on("click", ".in_stock", function (event) {update_stock(true,
  $(this))});
$("#i_table").on("click", ".edit_button", edit_button_click);
