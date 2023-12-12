const path = require("path");
const fs = require("fs");
module.exports = {        
   name: 'likes',        
   extend: 'apostrophe-pieces',        
   label: 'Applause',        
   pluralLabel: 'Applauses',
   alias : 'likesForm',
   addFields: [
       {
           name : 'title',
           type : 'string',
           label : 'Blog Title',
           readOnly : true
       },
       {
           name : 'postId',
           label : 'Post ID',
           type : 'string',
           modal : true,
           readOnly : true
       },
       {
           name : 'numberLikes',
           type : 'integer',
           label : 'Applause !',
           placeholder : 'Applause !',
           def : 0
           ,
           readOnly : true,
           min:0
       },
       {
           name: '_myLikes',
           label: 'Join Blog',
           help : 'For Index Display (Only in LIVE MODE)',
           type: 'joinByOne',
           withType: 'blog',
           modal: true,
           filters: {
               projection: {
                   title: 1,
                   type: 1,
                   slug: 1,
                   numberLikes: 1,
                   postId: 1
               },
               areas : false
           }
       }
   ]
   ,
   addColumns : [
    {
        name : 'numberLikes',
        label : 'Total Applause'
    }
   ],
   arrangeFields : [
       {
           name : 'likesData',
           label : 'Applause',
           fields : ['title','postId' , 'numberLikes' ,'_myLikes']
       },{
           name : 'config',
           label : 'Applause Configuration',
           fields: ['slug', 'published', 'tags'],
           last: true
       }
   ],
    seo: false,
    openGraph: false,
   afterConstruct : function(self){
       self.allLikeSchema();
   },
   construct : function(self,options){

    // Read all lib file and require them here (Minimize code technique - MVC)
    var pathLib = path.join(__dirname + "/lib");
    fs.readdirSync(pathLib).filter((file)=>{
        require(pathLib + "/" +  file)(self,options);
    });
   }
};