var alreadyCalledSerials = [], cart = {}, receipt = [], totalPrice = 0;
$("#target").keyup(function () {
  var key = $('#target').val();
  if (key.length > 4) {
    if (alreadyCalledSerials.indexOf(key) === -1) {
      // alert( "Handler for .keyup() called." );
      $.ajax({
        url: "/api/v1/ecom-product?serial=" + key,
        cache: false
      })
        .done(function (response) {
          if (response.results && response.results[0]) {
            var value = response.results[0];
            var html = value.title + ' ' + value.total;
            receipt.push({title: value.title, price: value.total, quantity: 1});
            // Initialize quantity in cart
            cart[value._id] = 1;
            html += '<div class="quantityInput" min="0" max="320000"><input type="text" class="quantity' + value._id + '" name="quantity" value="1"><button value="+" class="quantityPlus" onclick="increase(\'' + value._id + '\')">+</button><button value="+" class="quantityPlus" onclick="decrease(\'' + value._id + '\')">-</button></div>';
            html += '<br>';
            totalPrice += parseFloat(value.total);

            $(".totalPrice").text(totalPrice);
            $("#results").append(html);
          }
        });
      alreadyCalledSerials.push(key);
    }

  }
});
/*
    $("#results").click(function () {
      $("#target").keyup();
    });
*/
$(".completeOrder").click(function() {
  var paymentType = $('.paymentType').val();
  var snd=Object.assign(cart,paymentType);
  $.post('/pos/complete',  snd , function(result) {
    if (result.success === true) {
      window.location.href = '/pos';
    } else {
      $('.errorOrder').text(result.error);
    }
  });
  return false;
});

function increase(id) {
  cart[id] += 1;
  $(".quantity" + id).val(cart[id]);
}
function decrease(id) {
  cart[id] -= 1;
  $(".quantity" + id).val(cart[id]);
}
function printReceipt(header) {
  // http://printjs.crabbly.com/
  printJS({
    printable: receipt,
    properties: ['title', 'price', 'quantity'],
    type: 'json',
    header: header,
    //gridHeaderStyle: 'color: red;  border: 0px solid #3971A5;',
    //gridStyle: 'border: 0px solid #3971A5;'

  });
}
$("#cash").keyup(function () {
  var cash = $('#cash').val();
  var moneyBack = totalPrice - parseFloat(cash);

  if (isNaN(moneyBack)) {
    moneyBack = 0;
  }
  $(".moneyBack").text(moneyBack);
});
