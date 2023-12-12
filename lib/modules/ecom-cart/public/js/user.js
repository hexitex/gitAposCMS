function deleteFromCart(productId) {
  // console.log('delete cart item');
  $.post('/cart/delete', 'productId='+productId , function(result) {
   // console.log('delete cart item',result);
    if (result === true) {
     
      var el = document.getElementById(productId);
      //el.remove();
      document.location = '/cart';
    }
  });
 
  return true;
}; 
