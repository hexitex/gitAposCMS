apos.define('email-signup-form-widgets' , {
    extend : 'apostrophe-widgets',
    construct : function(self,options){
        self.play = function($widget , data , options){
            var $form = $widget.find('[data-email-signup-form]');
            var schema = self.options.submitEmailSignup;
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
                    if (!$("input[name='signupPersonName']").val() && $("input[name='signupEmail']").val() === "") {
                        alert("Please fill in all fields")
                    } else if ($("input[name='signupPersonName']").val() === "") {
                        alert("You forgot to type your name")
                    } else if ($("input[name='signupEmail']") === ""){
                        alert("You forgot to type your email")
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
                        alert('Error occured when submitting the signup');
                    } else {
                        $form.replaceWith($form.find('[data-thank-you]').css("display" , "block"));
                    }
                });

                function submitToServer(callback) {
                    piece.date = $('input[name="date"]').val();
                    piece.signupPersonName = $('input[name="signupPersonName"]').val();
                    piece.signupEmail = $('input[name="signupEmail"]').val();
                    piece.category= $('input[name="category"]').val();
                    return self.api('email-signup', piece, function (data) {
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