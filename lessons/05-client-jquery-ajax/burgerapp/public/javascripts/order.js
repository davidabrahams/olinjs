var $order_form = $("#order_form");
var $table = $("#o_table");

var cost = 0;

$order_form.submit(function(event) {
  event.preventDefault();
  console.log(get_ingredients());
  var name = $order_form.find("[name='name']").val();
  $.post("order", {
    name: name,
    ingredients: get_ingredients(),
    cost: cost
  }).done(function(data, status) {
    alert("Your order has been placed!");
  }).error(onError);
});

var onError = function(data, status) {
  window.alert("An error occurred! :(");
};

var get_ingredients = function()
{
  ings = [];
  $table.find("input:checked").each(function() {
    ings.push($(this).attr('name'));
  })
  return ings;
}

var cbx_change = function (box)
{
  // console.log(box);
  update_counter();
}

var update_counter = function()
{
  cost = 0;
  $table.find("input:checked").each(function() {
    price = $(this).attr('value');
        if (price) cost += parseFloat(price);
  })

  $("#total_cost").text("Total Cost: $" + cost);
}

$order_form.on("change", ":checkbox", function (event) {cbx_change($(this))});
