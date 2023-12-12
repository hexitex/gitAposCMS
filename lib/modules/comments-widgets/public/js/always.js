apos.define('comments-widgets' , {
  extend : 'apostrophe-widgets',
  construct : function(self,options){
    self.play = function($widget , data,options){
      var $form = $widget.find('[data-comment-form]');
      var schema = self.options.submitSchema;
      var piece = _.cloneDeep(self.options.piece);
      piece.published = true;

      return enableSubmit();

      function enableSubmit(){
        $form.on('submit' , function(){
          var date = new Date();
          var value = $('form[data-comment-form]').attr("id");
          $('input[name="postId"]').val(value);
          $('input[name="date"]').val(date);
          if (!$("input[name='readerName']").val() && $("textarea[name='comments']").val() === "") {
            alert("Name and Comment Required!")
          } else if ($("input[name='readerName']").val() === "") {
            alert("Name Required!")
          }else if($("textarea[name='comments']").val() === ""){
            alert("Comment Required!")
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
            alert('Error occured when submitting the comment');
          }else{
          
              apos.change('.comment-area');
            
          }
        });

        function submitToServer(callback){
          piece.date = $('input[name="date"]').val();
          piece.readerName = $('input[name="readerName"]').val();
          piece.comments = $('textarea[name="comments"]').val();
          piece.postId = $('input[name="postId"]').val();
          piece.title = $('form').attr("data-title");
        //  piece.slugId = $('form').attr("data-slug");
          piece.slug = $('form').attr("data-slug");
          piece._id = $('input[name="_id"]').val();
          return self.api('submit' , piece , function(data){
            // Promise from pieces that return status == 'ok'
            if(data.status === 'ok'){
              // All is well
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

    self.getComment = function(){
      $.ajax({
        url: "/modules/comments/get-comment",
        method: "PUT", // was PUT
        dataType: "JSON",
        data: {
          piece : {
            _id: apos.contextPiece._id
          }
        },
        success: function (response) {
          if (response.allcomments !== null) {
            $(".comment-text").text("+" + response.allcommentscount);
          }
        }
      });
    }

    apos.commentsWidgets = self;
  }
})