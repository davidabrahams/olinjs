var $add_form = $("#add_form");
var $edit_form = $("#edit_form");
var $table = $("#i_table");

var updateButtons = function()
{
  $(".out_of_stock").click(out_of_stock_func);
  $(".edit_button").click(edit_button_click);
}

var onPostSuccess = function(data, status) {


  // var partial = hbs.partials.table_row; // THIS DOESSN'T WORK. hbs.partials IS UNDEFINED
  // console.log(Handlebars);
  var html = Handlebars.templates['table_row.hbs'](data); // this works
  var table = document.getElementById("i_table");
  var row = table.insertRow(-1);
  row.innerHTML = html;
  updateButtons();
  $add_form.trigger('reset');
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
