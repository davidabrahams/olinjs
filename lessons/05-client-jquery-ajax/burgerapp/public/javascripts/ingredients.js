var $add_form = $("#add_form");
var $edit_form = $("#edit_form");
var $table = $("#i_table");
var hbs = require('hbs');

var updateButtons = function()
{
  $(".out_of_stock").click(out_of_stock_func);
  $(".edit_button").click(edit_button_click);
}

var onPostSuccess = function(data, status) {
  var table = document.getElementById("i_table");
  var row = table.insertRow(-1);
  var partial = hbs.partials['table_row']({data});
  console.log(partial);
  row.setAttribute("id", data._id);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = data.name;
  cell2.innerHTML = data.price;
  cell3.innerHTML = '<button type="button" class="out_of_stock">Out of Stock</button>';
  cell4.innerHTML = '<button type="button" class="edit_button">Edit</button>';
  updateButtons();
};

var onError = function(data, status) {
  window.alert("An error occurred! :(");
};

var out_of_stock_func = function () {
  var id = $(this).closest("tr").attr('id');
  $.post("ingredients/outofstock", {id: id})
  .done(function(data, status) {
    $("#" + data).remove();
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
  console.log('submitted');
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
    row = $('#' + id);
    row.find('td').eq(0).text(name);
    row.find('td').eq(1).text(price);
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

updateButtons();
