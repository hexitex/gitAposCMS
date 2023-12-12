module.exports = {        
    name: 'blog',        
    label: 'Blog',        
    pluralLabel: 'Blogs',
    alias :'myblog',        
    addFields: [
        {
            name: 'title',
            label: 'Blog Title',
            type: 'string',
            required: true
        }, {
            name: 'blogHeader',
            label: 'Blog Header',
            type: 'singleton',
            help: 'This will be display in Blog Details',
            widgetType: 'apostrophe-images',
            options: {
                aspectRatio: [4, 1],
                minSize: [720, 400],
                limit: 1,
                focalPoint: true,
                noHeight: true,
                size : '720'
            }
        },{
                 name: 'blogThumbnail',
                 label: 'Blog Thumbnail',
                 type: 'singleton',
                 help: 'This will be display in Blog List (GIF Supported)',
                 widgetType: 'apostrophe-images',
                 extensions: ['gif', 'jpg', 'png'],
                 options: {
                     aspectRatio: [1, 1],
                     minSize: [250, 250],
                     limit: 1,
                     focalPoint: true,
                     noHeight: true,
                     size : '350'
                 }
         },{
            name: 'slug',
            type: 'string',
            label: 'Slug',
            contextual: true
        }, {
            name: 'blogBody',
            label: 'Main Content',
            type: 'area',
            contextual: true
        },
        {
            name: '_myLikes',
            label: 'Join Applause For Index Display',
            type: 'joinByOneReverse',
            withType: 'likes',
            modal : true
        },
        {
            name: '_comments',
            type: 'joinByOneReverse',
            withType: 'comments',
            reverseOf: '_blog'
        },
        {
            name: 'blogConfig',
            label: 'Enable Applause/Comments in your blog ?',
            type: 'select',
            choices: [
                { label: 'Applause', value: 'like', showFields:['enableLikes'] },
                { label: 'Comments', value: 'comment', showFields:['enableComments'] },
                { label: 'Applause & Comments', value: 'both', showFields:['enableComments' , 'enableLikes'] }
            ]
        },
        {
            name : 'numberVisits',
            type : 'integer',
            def : 0,
            label : 'Number Of Visits',
            modal : true,
            readOnly : true
        },
        {
            name: 'enableComments',
            label: 'Enable Comment',
            type: 'singleton',
            widgetType: 'comments'
        },
        {
            name: 'enableLikes',
            label: 'Enable Applause',
            type: 'singleton',
            widgetType: 'likes'
        }
    ],
    arrangeFields: [{
            name: 'brief',
            label: 'Brief Section',
            fields: ['publishedAt', 'title', '_myLikes', '_comments', 'blogThumbnail', 'blogHeader', 'numberVisits']
        },
        {
             name : 'config',
             label : 'Blog Applause & Comments',
             fields: ['blogConfig', 'enableComments', 'enableLikes']
        },
        {
            name: 'content',
            label: 'Content Information',
            fields: ['blogBody']
        },
        {
            name: 'admin',
            label: 'Administrative',
            fields: ['slug', 'published', 'tags'],
            last: true
        }
    ],
    contextual : true,
    beforeConstruct : function(self,options){
        options.addFields = [
            {
                name : 'monthGroup',
                type : 'string',
                label : 'Month Group',
                contextual : true
            }
        ].concat(options.addFields || [] );
    },
    construct: function(self,options){
     //    console.log("Self methods ?" , self);
 
        var superBeforeSave = self.beforeSave;
        self.beforeSave = function(req , piece , options, callback){
         var monthNames = ["January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December"
         ];
 
         var d = new Date(piece.publishedAt);
         piece.monthGroup = monthNames[d.getMonth()] + " " + d.getFullYear();
 
         return superBeforeSave(req , piece , options,callback);
        }
    }
 };