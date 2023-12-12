var _ = require('lodash');
const fs = require("fs");
const path = require("path");
module.exports = {
  extend: 'apostrophe-pieces',
  name: 'reviews',
  label: 'Review Form',
  alias: 'reviewForm',
  pluralLabel: 'Reviews',
  addFields: [
    {
      name: 'productId',
      type: 'string',
      label: 'Product ID',
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
    },
    {
      name: 'ratings',
      label: 'Rating',
      placeholder: 'Rating',
      type: 'integer',
     
      required: true
    }, 
    {
      name: 'reviews',
      label: 'Review Text',
      placeholder: 'Your review, make it count and be honest!',
      type: 'string',
      textarea: true,
      required: true
    },
    {
      name: '_ecom-product',
      label: 'Join Product',
      type: 'joinByOne',
      withType: 'ecom-product',
      idField:'productId',
      filters: {
        projection: {
          type: 1,
          title: 1,
          slug: 1,
          date: 1,
          reviews: 1,
          readerName: 1,
          ratings:1,
          productId: 1
        },
        areas: false
      }
    },
    {
      name: 'title',
      type: 'string',
      label: 'Product Title',
      readOnly: true
    }
  ],
  addColumns : [
    {
      name : 'reviews',
      label : "Review Description"
    },
    {
      name : 'readerName',
      label : "Reviewers Name"
    }
  ],
  arrangeFields: [{
    name: 'review',
    label: 'Review',
    
     fields: ['date', 'readerName', 'reviews','ratings','_ecom-product']
  },
  {
    name: 'config',
    label: 'Review Configuration',
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
        reviews : after,
        reviewsBefore : before
      });
    };
    self.addHelpers({
      stars: function (obj, nos, displayOnly,justNumber) { // obj assume to have attr of rating
        let icons = '<span class="forTheStars">';
        let src = '';
        if (!obj || !obj.ratings && !justNumber) { //new
            icons = '<span class="forTheStars py-2 px-2" mod="' + obj.id + '">';
            for (let st = 0; st < nos; st++) {
                icons += '<i class="star-me fa fa-star-o mid-' + obj.id + '" sn="' + st + '" mid="' + obj.id + '"></i>'; // assign onclick in page with .star-me class selector
            }
            return icons + '</span>';
        }
        if (obj.ratings && displayOnly) { // show page or index no need to deal with obj._id
            let last = '';
    
            if (obj.ratings && obj.ratings.toString().indexOf('.')>0) // dispaly it if it is there but need to get back to this
            {
                last = '<i class="fa star-me star-me-on fa-star-half-o"></i>'
            }
    
            for (let i = 0; i < Math.floor(obj.ratings); i++) {
                icons += '<i class="fa star-me star-me-on fa-star"></i>'
            }
            icons += last;
            for (let i = 0; i < nos - Math.ceil(obj.ratings); i++) {
                icons += '<i class="fa star-me fa-star-o"></i>';
            }
        }
        else if (justNumber) { // show page or index no need to deal with obj._id
          let last = '';
  
          if (obj && obj.toString().indexOf('.')>0) // dispaly it if it is there but need to get back to this
          {
              last = '<i class="fa star-me star-me-on fa-star-half-o"></i>'
          }
  
          for (let i = 0; i < Math.floor(obj); i++) {
              icons += '<i class="fa star-me star-me-on fa-star"></i>'
          }
          icons += last;
          for (let i = 0; i < nos - Math.ceil(obj); i++) {
              icons += '<i class="fa star-me fa-star-o"></i>';
          }
      }
        else if (obj.ratings && !displayOnly) { // edit
            let last = '';
            icons = '<span class="forTheStars py-2 px-2" mod="' + obj.id + '">';
    
            for (let st = 0; st < nos; st++) {
                if (st <=obj.ratings - 1) {
                    icons += '<i class="star-me star-me-on fa fa-star mid-' + obj.id + '" mid="' + obj.id + '" sn="' + st + '" ></i>';
                }
                else {
                    icons += '<i class="star-me fa fa-star mid-' + obj.id + '" mid="' + obj.id + '" sn="' + st + '"></i>';
                }
            }
        }
    
        return icons + '</span>';
    
        }
  
    });
  }
}