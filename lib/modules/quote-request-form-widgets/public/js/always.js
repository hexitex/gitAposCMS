apos.define('quote-request-form-widgets' , {
    extend : 'apostrophe-widgets',
    construct : function(self,options){
        self.play = function($widget , data , options){
            var $form = $widget.find('[data-quote-request-form]');
            var schema = self.options.submitQuote;
            var piece = _.cloneDeep(self.options.piece);
            
            return enableSubmit();

            function enableSubmit() {
                $form.on('submit', function () {
                    var year = new Date().getFullYear()
                    var month = (new Date().getMonth() < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
                    var day = (new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate()
                    var date = [
                        [year],
                        [month],
                        [day]
                    ]
                    date.join('-')
                    $('input[name="date"]').val(date.join('-'));
                    if (!$("input[name='personName']").val() && $("input[name='email']").val() === "" && $("textarea[name='message']").val() === "") {
                        alert("Please fill in all fields")
                    } else if ($("input[name='personName']").val() === "") {
                        alert("You forgot to type your name")
                    } //else if ($("textarea[name='message']").val() === "") {
                      //  alert("You forgot to type a message")
                    //}
                    else if ($("input[name='email']") === ""){
                        alert("You forgot to type your email")
                    } 
                    else if ($("input[name='telephone']") === ""){
                        alert("You forgot to type your telephone number")
                    } else {
                        submit();
                    }
                    return false;
                })
            }

            function submit() {
                return async.series([
                    submitToServer
                ], function (err) {
                    if (err) {
                        alert('Error occured when submitting the quote');
                    } else {
                        $form.replaceWith($form.find('[data-thank-you]').css("display" , "block"));
                    }
                });

                function submitToServer(callback) {
                    piece.date = $('input[name="date"]').val();
                    piece.personName = $('input[name="personName"]').val();
                    piece.email = $('input[name="email"]').val();
                    piece.message = $('textarea[name="message"]').val();
                    piece.numberOfRooms=$('input[name="numberOfRooms"]').val();
                    piece.numberOfExtWalls=$('input[name="numberOfExtWalls"]').val();
                  
                    return self.api('quote', piece, function (data) {
                        // Promise from pieces that return status == 'ok'
                        if (data.status === 'ok') {
                            // All is well
                            return callback(null)
                        }
                        // API Level error
                        return callback(null);
                    }, function (err) {
                        // Transport Level Error
                        return callback(err);
                    })
                }
            }
        }
    }
})