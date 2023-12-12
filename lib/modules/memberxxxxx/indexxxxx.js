// var _ = require('lodash');
// const fs = require("fs");
//

// const path = require("path");
// const QRCode = require("qrcode");
// const dataURL=null;
//const usr=apos.user();
module.exports = {
  extend: 'apostrophe-pieces',
  name: 'member',
  label: 'Member',
  alias: 'memberForm',
  pluralLabel: 'Members',
  addFields: [
    {
      name: 'first',
      label: 'First Name',
      placeholder: 'Firstname',
      type: 'string',
      required: true,
      //  def:usr
    },
    {
      name: 'last',
      label: 'Surname',
      placeholder: 'Surname',
      type: 'string',
      required: true,
      //  def:usr
    },
    {
      name: 'pass',
      label: 'Password',
      placeholder: 'password',
      type: 'password',
      required: true,
      //  def:usr
    },
    // {
    //   name: 'passConfirm',
    //   label: 'Confirm Password',
    //   placeholder: 'confirm password',
    //   type: 'password',
    //   // required: true,
    //   //  def:usr
    // },
    {
      name: 'emailAddress',
      label: 'Email',
      placeholder: 'Email',
      type: 'email',
      required: true,
      //  def:usr
    },
     {
      name: 'mobile',
      label: 'Mobile Number',
      placeholder: 'Mobile Telephone',
      type: 'string',
      required: false,
      //  def:usr
    },
    {
      name: 'joinDate',
      label: 'Joined Date',
      type: 'date',
      placeholder: 'Joined Date',
      readOnly: false,
      // sortify: true,
      // required: true,
      // pikadayOptions: {
      //   format: 'DD/MM/YYYY',
      //   firstDay: 1
      // }
      // modal: true
    },
    {
      name: 'address1',
      label: 'Address 1',
      placeholder: 'Address 1',
      type: 'string',
      required: true
    },
    {
      name: 'address2',
      label: 'Address 2',
      placeholder: 'Address 2',
      type: 'string',
      required: true
    },
    {
      name: 'address3',
      label: 'Address 3',
      placeholder: 'Address 3',
      type: 'string',
      required: true
    },
    {
      name: 'address4',
      label: 'Address 4',
      placeholder: 'Address 4',
      type: 'string',
      required: true
    },
    {
      name: 'country',
      label: 'Country',
      placeholder: 'Country',
      type: 'string',
      required: true
    },
    {
      name: 'postcode',
      label: 'Post Code',
      placeholder: 'Postcode',
      type: 'string',
      required: true
    },
    {
      name: 'photo',
      label: 'Icon',
      type: 'attachment',
      help: 'Your Icon',
      // widgetType: 'apostrophe-images',
      extensions: ['gif', 'jpg', 'png'],
      options: {
        aspectRatio: [1, 1],
        // minSize: [350, 500],
        limit: 1,
        // focalPoint: true,
        // size: '720p'
      }
    }
    // },
   
    // {
    //   name: 'lastScanned',
    //   label: 'Last Scanned',
    //   type: 'array',
    //   placeholder: 'Last Scanned Date',
    //   readOnly: false,
    //   titleField:"Scanned on Date",
    //   schema: [
    //     {
    //       type: 'date',
    //       name: 'scannedDate',
    //     }
    //   ]
    // }
  ], arrangeFields: [

    {
      name: 'member',
      label: 'Member',
      fields: [ 'first', 'last','pass','emailAddress', 'photo', 'mobile', 'address1','address2','address3','address4','country', 'postcode']
    },
    {
      name: 'admin',
      label: 'Admin',
      fields: ['qrcode', 'slug', 'published', 'trash','tags','joinDate']
    },

  ],

  seo: false,
  openGraph: false,
  permissionsFields: false,
  // afterConstruct : function(self){
  //   // FOR EXTENDING OUR OWN MODULE METHOD
  //   self.setSubmitSchema();
  // },

  construct: function (self, options) {
   
   
//     try{
// self.addUrls();
//     }catch(e){}
    self.on('apostrophe-pages:beforeSend', 'addQRCode', async function(req) {
      // Node 8+: we can "await" anything that returns a promise, like
      // the request-promise module does
     
  //    console.log(req.path.indexOf('/ww/'))
  

    //   if (req.path.indexOf('/lookup/')>-1)
    //   {
    //  //   console.log('xxxxx'+req.path)
    //   var opts = {
    //     errorCorrectionLevel: 'H',
    //     type: 'image/png',
    //     // quality: 0.5,
    //     margin: 1,
    //     width: 300,
    //     color: {
    //       dark: "#000000",
    //       light: "#ffff00"
    //     }
    //   }
    //   var qrcodestr = 'https://www.podbit.com'+req.data.piece._url+ '?scan=1 Name: ' + req.data.piece.title + ' Expiry Date ' + req.data.piece.expDate + ' Member No: ' + req.data.piece.memberNumber;
    //   var url=await QRCode.toDataURL(qrcodestr, opts);
    //   //  {
    //   //   if (err) throw err

    //     req.data.piece.qrcode = url;
    //   //   console.log(url);
    //   // }) 
    //  // req.data.qrcode = qrcode.url;
    // }
    // self.addUrls = (req, pieces, callback) => {
    //   //  // console.log(pieces);
    //    try{ for (const piece of pieces) {
         
    //       piece._url = '/ww/'+piece.slug;
    //  //     console.log(piece._url);
    //     }
    //      return callback(null);
    //   }catch(e){}
    //   };
    });
  }
  // }
  // }


}
