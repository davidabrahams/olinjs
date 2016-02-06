var $form = $("#add_form");
var $table = $("#i_table");

var onSuccess = function(data, status) {
  var table = document.getElementById("i_table");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = data.name;
  cell2.innerHTML = data.price;
  cell3.innerHTML = '<button type="button" class="out_of_stock">Out of Stock</button>';
  cell4.innerHTML = '<button type="button">Edit</button>';
};

var onError = function(data, status) {
};

$form.submit(function(event) {
  event.preventDefault();
  var name = $form.find("[name='name']").val();
  var price = $form.find("[name='price']").val();
  $.post("ingredients", {
    name: name,
    price: price
  })
  .done(onSuccess)
  .error(onError);
});

$(".out_of_stock").click(function () {
  $(this).closest("tr").remove();
});
