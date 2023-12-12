var async = require('async');
module.exports = {
    extend : 'apostrophe-widgets',
    label : 'Email Signup Widgets',
    skipInitialModal : true,
    scene : 'user',
    beforeConstruct: function (self, options) {
        options.addFields = [{
            name: 'instruction',
            type: 'string',
            label: 'Form Instructions',
            textarea : true,
            def: 'Signup to our weekly email for the latest offers'
        },
    {
        name: 'cat',
        type: 'string',
        label: 'Category',
        def: 'General Contact',
        help:'Change this for the page or subject you want to gage'
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
            self.pushAsset('stylesheet' , 'emailSignupForm' , {
                when : 'always'
            })
        }

        // get contact forms pieces
        self.forms = self.apos.emailSignupForms;

        // Output a render from our schema
        self.output = function(widget , options){
            return self.partial(self.template , {
                widget : widget,
                options : options,
                manager : self,
                emailSignups : self.forms.emailSignupSchema
            })
        }

        // create a submit route
        self.route('post','email-signup' , function(req, res){
            return self.forms.submitEmailSignup(req , function(err){
                return res.send({status : err ? 'error' : 'ok'});
            })
        });

        // Pass value to singleton
        var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
        self.getCreateSingletonOptions = function(req){
            var options = superGetCreateSingletonOptions(req);
            options.emailSignupSchema = self.forms.emailSignupSchema;
            options.piece = self.forms.newInstance();
            return options;
        }
    }
}