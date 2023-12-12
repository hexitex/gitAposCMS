var async = require('async');
module.exports = {        
   name: 'email-signup-form',        
   extend: 'apostrophe-pieces',        
   label: 'Signup',        
   pluralLabel: 'Signups',  
   alias : 'emailSignupForms',
   addFields: [
       {
           name : 'signupPersonName',
           type : 'string',
           label : 'Name',
           placeholder : 'Your Name',
           labelShow : true
       },
       {
           name : 'signupEmail',
           type : 'string',
           label : 'Email',
           placeholder: 'Your Email',
           labelShow : true
       },
       {
           name: 'date',
           label: 'Date',
           type: 'date',
           readOnly: true,
           sortify: true,
           modal: true
       }
   ],
   arrangeFields : [
    {
        name : 'allEmailSignup',
        label : 'Signup',
        fields : ['date' , 'signupPersonName' , 'signupEmail' ]
    },
    {
        name : 'Configs',
        label : 'Configurations',
        fields : ['title' , 'slug' , 'published' , 'tags'],
        last : true
    }
   ],
   permissionsFields : false,
   seo : false,
   openGraph : false,
   afterConstruct : function(self){
       self.allEmailSignupSchema();
   },
   construct : function(self,options){
       self.allEmailSignupSchema = function(){
           self.emailSignupSchema = self.apos.schemas.subset(self.schema , 
            ['signupPersonName','signupEmail' , 'date']
        )
       }

       self.submitEmailSignup = function(req,callback){
            return async.series([
                update
            ],callback);

            function update(callback){
                var piece = {
                    title: req.body.signupPersonName + ' - Email Signup',
                    signupPersonName : req.body.signupPersonName,
                    signupEmail : req.body.signupEmail,
                    date : req.body.date,
                    category:req.body.category,
                    published : true
                }

                return self.insert(req,piece , {permissions : false } ,callback);
            }
       }
   }
};