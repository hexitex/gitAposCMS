var async = require('async');
module.exports = {
    extend : 'apostrophe-widgets',
    label : 'Quote Form Widgets',
    skipInitialModal : true,
    scene : 'user',
    beforeConstruct: function (self, options) {
        options.addFields = [{
            name: 'instruction',
            type: 'string',
            label: 'Form Instructions',
            textarea : true,
            def: 'Would you like a free quote? Fill up the form below.'
        }].concat(options.addFields || []);
    },
    construct : function(self,options){
        // For push assets
        var superPushAssets = self.pushAssets;
        self.pushAssets = function(){
            superPushAssets();
            // self.pushAsset('script' , 'always' , {
            //     when : 'always'
            // })
            self.pushAsset('stylesheet' , 'contactForm' , {
                when : 'always'
            })
        }

        // get contact forms pieces
        self.forms = self.apos.quoteRequestForms;

        // Output a render from our schema
        self.output = function(widget , options){
            return self.partial(self.template , {
                widget : widget,
                options : options,
                manager : self,
                quotes : self.forms.quoteRequestSchema
            })
        }

        // create a submit route
        self.route('post','quote' , function(req, res){
            return self.forms.submitQuote(req , function(err){
                return res.send({status : err ? 'error' : 'ok'});
            })
        });

        // Pass value to singleton
        var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
        self.getCreateSingletonOptions = function(req){
            var options = superGetCreateSingletonOptions(req);
            options.quoteRequestSchema = self.forms.quoteRequestSchema;
            options.piece = self.forms.newInstance();
            return options;
        }
    }
}