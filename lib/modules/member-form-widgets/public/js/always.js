apos.define('member-form-widgets' , {
    extend : 'apostrophe-widgets',
    construct : function(self,options){
        self.play = function($widget , data , options){
            var $form = $widget.find('[data-member-form]');
            var schema = self.options.submitMember;
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
                    if (
                        !$("input[name='first']").val() || 
                        !$("input[name='last']").val() || 
                        $("input[name='emailAddress']").val() === "" || 
                        $("input[name='postCode']").val() === "" 
                        // ||
                        // $("input[name='photo']").val() === "" 
                        )
                        {
                        alert("Please fill in all fields")
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
                        alert('Error occured when submitting the form');
                    } else {
                        $form.replaceWith($form.find('[data-thank-you]').css("display" , "block"));
                    }
                });

                function submitToServer(callback) {
                    piece.joinDate = $('input[name="date"]').val();
                    piece.first = $('input[name="first"]').val();
                    piece.last = $('input[name="last"]').val();
                    piece.emailAddress = $('input[name="emailAddress"]').val();
                    piece.postCode = $('input[name="postcode"]').val();
                    // piece.photo=$('file[name="photo"]').val();
                    
                    return self.api('member', piece, function (data) {
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