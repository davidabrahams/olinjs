var $order_form = $("#order_form");
var $o_table = $("#o_table");

var cost = 0;

$order_form.submit(function(event) {
  event.preventDefault();
  var name = $order_form.find("[name='name']").val();
  var ings = get_ingredients();
  console.log(ings);
  var order = {
    name: name,
    ingredients: ings,
    cost: cost
  };
  $.post("order", order).done(function(data, status) {
    alert("Your order has been placed!");
  }).error(onError);
});

var onError = function(data, status) {
  window.alert("An error occurred! :(");
};

var get_ingredients = function()
{
  ings = [];
  $o_table.find("input:checked").each(function() {
    ings.push($(this).attr('name'));
  })
  return ings;
}

var update_counter = function(event)
{
  cost = 0;
  console.log($o_table)
  $o_table.find("input:checked").each(function() {
    price = $(this).attr('value');
        if (price) cost += parseFloat(price);
  })

  $("#total_cost").text("Total Cost: $" + cost);
}

$order_form.on("change", ":checkbox", update_counter);
