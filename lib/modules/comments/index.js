var _ = require('lodash');
const fs = require("fs");
const path = require("path");
module.exports = {
  extend: 'apostrophe-pieces',
  name: 'comments',
  label: 'Comment Form',
  alias: 'commentForm',
  pluralLabel: 'Comments',
  addFields: [
    {
      name: 'postId',
      type: 'string',
      label: 'Post ID',
      placeholder : 'Post ID' ,
      readOnly: true,
      modal : true
    }, {
      name: 'date',
      label: 'Date',
      type: 'date',
      placeholder : 'Date',
      readOnly : true,
      sortify: true,
      modal: true
    }, {
      name: 'readerName',
      label: 'Name',
      placeholder: 'Your Name',
      type: 'string',
      required: true
    }, {
      name: 'comments',
      label: 'Comment',
      placeholder: 'Your comment, make it count and be nice!',
      type: 'string',
      textarea: true,
      required: true
    },
    {
      name: '_blog',
      label: 'Join Blog',
      type: 'joinByOne',
      withType: 'blog',
      filters: {
        projection: {
          type: 1,
          title: 1,
          slug: 1,
          date: 1,
          comments: 1,
          readerName: 1,
          postId: 1
        },
        areas: false
      }
    },
    {
      name: 'title',
      type: 'string',
      label: 'Blog Title',
      readOnly: true
    }
  ],
  addColumns : [
    {
      name : 'comments',
      label : "Comment Description"
    },
    {
      name : 'readerName',
      label : "Comments's Name"
    }
  ],
  arrangeFields: [{
    name: 'comment',
    label: 'Comment',
    // fields: ['readerName', 'comments','_blog']
     fields: ['postId', 'date', 'readerName', 'comments','_blog']
  },
  {
    name: 'config',
    label: 'Comment Configuration',
    fields: ['title', 'slug', 'published', 'tags'],
    last: true
  }],
  addBatchOperations: [{
    name: 'delete',
    label: 'Permanent Delete',
    unlessFilter: {
      trash: false
    }
  }],
  seo : false,
  openGraph : false,
  permissionsFields: false,
  afterConstruct : function(self){
    // FOR EXTENDING OUR OWN MODULE METHOD
    self.setSubmitSchema();
  },
  construct: function (self, options) {

    // Read all lib files and require them
    var pathLib = path.join(__dirname + "/lib");
    fs.readdirSync(pathLib).filter((file)=>{
      require(pathLib + "/" + file)(self, options);
    });

    // To render commit preview (Customize myself, by default, it's nothing. Checkout workflowPreview.html)
    self.workflowPreview = function (req, before, after) {
      return self.render(req, 'workflowPreview', {
        comments : after,
        commentsBefore : before
      });
    };

  }
}