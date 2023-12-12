apos.define('reviews-widgets' , {
  extend : 'apostrophe-widgets',
  construct : function(self,options){
    self.play = function($widget , data,options){
      var $form = $widget.find('[data-review-form]');
      var schema = self.options.submitSchema;
      var piece = _.cloneDeep(self.options.piece);
      piece.published = true;

      return enableSubmit();

      function enableSubmit(){
        $form.on('submit' , function(){
          var date = new Date();
          var value = $('form[data-review-form]').attr("id");
          var title= $('form[data-review-form]').attr("data-title");
          $('input[name="date"]').val(date);
          $('input[name="productId"]').val(value);
          $('input[name="title"]').val(title);
          if (!$("input[name='readerName']").val() && $("textarea[name='reviews']").val() === "" && $("input[name='ratings']").val() === "" ) {
            alert("Name, Rating and Review Required!")
          } else if ($("input[name='readerName']").val() === "") {
            alert("Name Required!")
          }else if($("textarea[name='reviews']").val() === ""){
            alert("Review Required!")
          }else if($("input[name='ratings']").val() === ""){
            alert("Rating Required!")
          }else{
            submit();
          }
          return false;
        })
      }

      function submit(){
        return async.series([
          submitToServer
        ] , function(err){
          if(err){
            alert('Error occured when submitting the review');
          }else{
          
              apos.change('.review-area');
            
          }
        });

        function submitToServer(callback){
       //   console.log('subtoserver always.js '+$('form').attr("data-title"))
          piece.date = $('input[name="date"]').val();
          piece.readerName = $('input[name="readerName"]').val();
          piece.reviews = $('textarea[name="reviews"]').val();
          piece.ratings = $('input[name="ratings"]').val();
          piece.productId = $('input[name="productId"]').val();
          piece.title = $('input[name="title"]').val();
        //  piece.slugId = $('form').attr("data-slug");
          piece.slug = $('form[data-review-form]').attr("data-slug");
          piece._id = $('input[name="_id"]').val();
          return self.api('submit' , piece , function(data){
            // Promise from pieces that return status == 'ok'
         //   console.log('insert from always.js');
            if(data.status === 'ok'){
              // All is well
           //   console.log('insert from always.js');
              return callback(null)
            }
            // API Level error
            return callback(null);
          },function(err){
            // Transport Level Error
            return callback(err);
          })
        }
      }
    }

    self.getReview = function(){
      $.ajax({
        url: "/modules/reviews/get-review",
        method: "PUT", // was PUT
        dataType: "JSON",
        data: {
          piece : {
            _id: apos.contextPiece._id
          }
        },
        success: function (response) {
          if (response.allreviews !== null) {
            $(".review-text").text("+" + response.allreviewsscount);
          }
        }
      });
    }

    apos.reviewsWidgets = self;
  }
})