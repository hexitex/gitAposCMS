var async = require('async');
module.exports = {
    extend : 'apostrophe-widgets',
    label : 'Contact Form Widgets',
    skipInitialModal : true,
    scene : 'user',
    beforeConstruct: function (self, options) {
        options.addFields = [{
            name: 'instruction',
            type: 'string',
            label: 'Form Instructions',
            textarea : true,
            def: 'Would you like to send a word or three ? Fill up the form below.'
        }].concat(options.addFields || []);
    },
    construct : function(self,options){
        // For push assets
        var superPushAssets = self.pushAssets;
        self.pushAssets = function(){
            superPushAssets();
            self.pushAsset('script' , 'always' , {
                when : 'always'
            })
            // self.pushAsset('stylesheet' , 'contactForm' , {
            //     when : 'always'
            // })
        }

        // get contact forms pieces
        self.forms = self.apos.contactForms;

        // Output a render from our schema
        self.output = function(widget , options){
            return self.partial(self.template , {
                widget : widget,
                options : options,
                manager : self,
                contacts : self.forms.contactSchema
            })
        }

        // create a submit route
        self.route('post','contact' , function(req, res){
            return self.forms.submitContact(req , function(err){
                return res.send({status : err ? 'error' : 'ok'});
            })
        });

        // Pass value to singleton
        var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
        self.getCreateSingletonOptions = function(req){
            var options = superGetCreateSingletonOptions(req);
            options.contactSchema = self.forms.contactSchema;
            options.piece = self.forms.newInstance();
            return options;
        }
    }
}