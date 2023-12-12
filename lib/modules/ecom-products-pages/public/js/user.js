$(function() {
  initStars();
});

apos.on('enhance' , function(){initStars();});
  function initStars(){
  $('.addToCart').submit(function() {
    $.post('/cart/add', $('.addToCart').serialize(), function(result) {
      if (result === true) {
        $('.addToCart .thankYou').show();
      }
    });
    return false;
  });

  $('.star-me').on('click',function(){
    var rate=$(this).attr('sn');
    $('#rating').val(Number(rate)+1);
    var idme=$(this).attr('mid');
    $('.mid-'+idme).each(function(index,element){
        if ($(element).attr('sn')<=rate){
        $(element).addClass('star-me-on')
        }
        else{
        $(element).removeClass('star-me-on')
        } 
    });            
  });
  // these next two are not used on mobile devices
   $('.star-me').on('mouseenter',function(){
    var rate=$(this).attr('sn');
    var idme=$(this).attr('mid');
    $('.mid-'+idme).each(function(index,element){
        if ($(element).attr('sn')<=rate){
        $(element).addClass('star-me-on')
        }
        else{
        $(element).removeClass('star-me-on')
        } 
    });            
  });
  $('.forTheStars').on('mouseleave', function(){
      $(this).children().each(function(index,element){
        //  console.log(index)
        if ($(element).attr('mid')){
          if ($(element).attr('sn')+1<=$('#rating').val()){$(element).addClass('star-me-on')}else{$(element).removeClass('star-me-on')}
       } })
      
  })
  }

  // $(".quantityMinus").click(function() {
  //   var qInput = $(this).parents(".quantityInput");
  //   var qText = qInput.find(".quantity");
  //   var qValue = parseInt((qText.val())? qText.val() : 0);
  //   qText.val(Math.max(qValue - 1, (qInput.attr("min"))? qInput.attr("min") : -0xffff));
  // });

  // $(".quantityPlus").click(function() {
  //   var qInput = $(this).parents(".quantityInput");
  //   var qText = qInput.find(".quantity");
  //   var qValue = parseInt((qText.val())? qText.val() : 0);
  //   qText.val(Math.min(qValue + 1, (qInput.attr("max"))? qInput.attr("max") : 0xffff));
  // });
  // $('.addReview').submit(function() {
  //   $.post('/products/reviews', $('.addReview').serialize(), function(result) {
  //     if (result === true) {
  //       $('.addReview .thankYou').show();
  //     }
  //   });
  //   return false;
  // });
  // $('.addRating').submit(function() {
  //   $.post('/products/ratings', $('.addRating').serialize(), function(result) {
  //     if (result === true) {
  //       $('.addRating .thankYou').show();
  //     }
  //   });
  //   return false;
  // });

//});
