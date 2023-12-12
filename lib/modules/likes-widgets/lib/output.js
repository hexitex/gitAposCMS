module.exports = function(self , options){
    self.output = function (widget, options) {
        return self.partial(self.template, {
            widget: widget,
            options: options,
            manager: self,
            likes: self.likes.likeSchema
        });
    };

    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;

    self.getCreateSingletonOptions = function (req) {
        var options = superGetCreateSingletonOptions(req);
        options.likeSchema = self.likes.likeSchema;
        options.piece = self.likes.newInstance();
        return options;
    }
}