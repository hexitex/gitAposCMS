apos.define('likes-widgets', {
    extend: 'apostrophe-widgets',
    construct: function (self, options) {
        self.play = function ($widget, data, options) {
            var $form = $widget.find('[data-likes-form]');
            var schema = self.options.likeSchema;
            var piece = _.cloneDeep(self.options.piece);

            return enableSubmit();

            function enableSubmit() {
                $form.on('submit', function () {
                    var value = $('form[data-likes-form]').attr("id");
                    $('input[name="postId"]').val(value);
                    submit();
                    return false;
                })
            }


            function submit() {
                return async.series([
                    submitToServer
                ], function (err) {
                    if (err) {
                        alert('Error occured when submitting the comment');
                    } else {
                        // Using fromTo and repeat with yoyo to make it run once and not increment by pixel if pressed multiple times.
                        TweenMax.fromTo('.animateLikes', 0.55, {
                            yPercent: '0',
                            xPercent: '0',
                            opacity:-.50
                        }, {
                            yPercent: '-=10',
                            xPercent: '-=100',
                            zIndex: 99,
                            repeat: 1,
                            width:"30vw", 
                            height:"50vh",
                            opacity:0.55,
                            yoyo: true,
                            overwrite: 0,
                            ease: Elastic.easeout,
                            onComplete: function () {
                                $(".animateLikes").css("z-index", 99);
                                self.getLikes();
                                setTimeout(function() {
                                    $(".animateLikes").css("z-index", 1);
                                }, 500);
                            }
                        });
                    }
                });

                function submitToServer(callback) {
                    piece.numberLikes = 1;
                    piece.postId = $('input[name="postId"]').val();
                    piece.title = $('form').attr("data-title");
                    piece.slugId = $('form').attr("data-slug");
                    piece.published = true;
                    return self.api('like', piece, function (data) {
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

        self.getLikes = function(){
            $.ajax({
                url: "/modules/likes/get-like",
                method: "PUT",
                dataType: "JSON",
                data: {
                    pieceId: $(".like-text").attr("data-piece")
                },
                success: function (response) {
                    if (response.likesInfo !== null) {
                        $(".like-text").text("+" + response.likesInfo.numberLikes);
                    } else {
                        $(".like-text").text("+0");
                    }
                }
            });
        }

        apos.likesWidgets = self;
    }
})