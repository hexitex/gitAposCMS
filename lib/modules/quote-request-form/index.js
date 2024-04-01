const path = require("path");
const fs = require("fs");

const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: process.env.EMAILSERVER,
  port: 465,
  secure: true
  , // true for 465, false for other ports
  auth: {
    user: process.env.EMAILUSER, // mail user
    pass: process.env.EMAILPASSWORD // mail password, always use env vars
  },
  tls: {
    ciphers: 'SSLv3'
  }
});
function getDate() {
  var year = new Date().getFullYear()
  var month = (new Date().getMonth() < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
  var day = (new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate()
  var date = [
    [year],
    [month],
    [day]
  ]
  //date.join('-')
  return date.join('-');
}
function getNumberDate() {
  var year = new Date().getFullYear()
  var month = (new Date().getMonth() < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
  var day = (new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate()
  var hour = new Date().getHours();
  var min = new Date().getMinutes();
  var sec = new Date().getSeconds();
  var ms = new Date().getMilliseconds();
  var date = [
    [year],
    [month],
    [day],
    [hour],
    [min],
    [sec],
    [ms]
  ]

  // date.join('-')
  return date.join('-');
}
function getTitle() {
  return getNumberDate();
}

module.exports = {
  name: 'quote-request-form',
  extend: 'apostrophe-pieces',
  label: 'Quote Request',
  pluralLabel: 'Quote Requests',
  pathLib: __dirname + '/lib',
  alias: 'quoteRequestForms',
  scene: 'user',

  addFields: [
    {
      name: 'date',
      type: 'date',
      def: getDate(),
      labelShow: false
    },
    {
      name: 'title',
      type: 'string',
      def: getTitle(),
      labelShow: false
    },
    {
      name: 'slug',
      type: 'string',
      def: getTitle(),
      labelShow: false
    },
    {
      name: 'personName',
      type: 'string',
      label: 'Name',
      placeholder: 'Your Name',
      // labelshow : false,
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Your email address',
      // labelShow : false,
      required: true
    },
    {
      name: 'telephone',
      type: 'string',
      label: 'Telephone Number',
      placeholder: 'Telephone No, you can leave both landline and mobile if you wish',
      // labelShow : false,
      required: true
    },
    {
      name: 'numberOfRooms',
      type: 'integer',
      label: 'Number of Rooms for Plastering?',
      placeholder: 'Enter number of Rooms for Plastering?',
      labelShow: true,
      def:"0"
    },
    {
      name: 'numberOfExtWalls',
      type: 'integer',
      label: 'Number of external Walls for Rendering?',
      placeholder: 'Enter number of external Walls for Rendering',
      labelShow: true,
      def:"0"
    },

    {
      name: 'message',
      type: 'string',
      label: 'Additional Information',
      placeholder: 'please provide some details of the job',
      labelShow: true,
      textarea: true
    },
    {
      name: 'address',
      type: 'string',
      label: 'Address - optional but please indicate your general area',
      labelShow: true,
      textarea: true
    },
    {
      type: 'attachment',
      name: 'image1',
      label: 'Photo 1',
      group: 'images',
      help: 'Adding photos is optional, but it will really help me understand the condition of the work area, surfaces, etc.',
      widgetControls: true
    },
    {
      type: 'attachment',
      name: 'image2',
      label: 'Photo 2',
      group: 'images'
    },
    {
      type: 'attachment',
      name: 'image3',
      label: 'Photo 3',
      group: 'images'
    },
    {
      type: 'attachment',
      name: 'image4',
      label: 'Photo 4',
      group: 'images'
    },
    {
      type: 'attachment',
      name: 'image5',
      label: 'Photo 5',
      group: 'images'
    },
    {
      type: 'attachment',
      name: 'image6',
      label: 'Photo 6',
      group: 'images'
    },
    {
      type: 'attachment',
      name: 'image7',
      label: 'Photo 7',
      group: 'images'
    },
    {
      type: 'attachment',
      name: 'image8',
      label: 'Photo 8',
      group: 'images'
    },
    {
      type: 'attachment',
      name: 'image9',
      label: 'Photo 9',
      group: 'images'
    },
    {
      type: 'attachment',
      name: 'image10',
      label: 'Photo 10',
      group: 'images'
    }
  ],
  addColumns: [
    
    {
      name: 'personName',
      label: 'Name'
    },
    {
      name: 'telephone',
      label: 'Tel'
    },
    {
      name: 'address',
      label: 'Address'
    },
    {
      name: 'message',
      label: 'Message'
    }
  ],
  arrangeFields: [
    {
      name: 'allQuote',
      label: 'Quote',
      fields: [
        'date',
        'personName',
        'email',
        'telephone',
        'numberOfRooms',
        'numberOfExtWalls',
        'message',
        'address','image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 'image9', 'image10']
    },
    {
      name: 'Configs',
      label: 'Configurations',
      fields: ['title', 'slug', 'published', 'tags'],
      last: true
    }
  ],
  permissionsFields: false,
  seo: false,
  openGraph: false,
  construct: function (self, options) {

    var superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      // self.pushAsset('script' , 'always' , {
      //     when : 'always'
      // })
      self.pushAsset('stylesheet', 'quotecss', {
        when: 'always'
      })
    }

    self.afterInsert = function (req, piece, options, callback) {

      var img1 = self.apos.attachments.url(piece.image1, { size: '350', edit: false })
      var img2 = self.apos.attachments.url(piece.image2, { size: '350', edit: false })
      var img3 = self.apos.attachments.url(piece.image3, { size: '350', edit: false })
      var img4 = self.apos.attachments.url(piece.image4, { size: '350', edit: false })
      var img5 = self.apos.attachments.url(piece.image5, { size: '350', edit: false })
      var img6 = self.apos.attachments.url(piece.image6, { size: '350', edit: false })
      var img7 = self.apos.attachments.url(piece.image7, { size: '350', edit: false })
      var img8 = self.apos.attachments.url(piece.image8, { size: '350', edit: false })
      var img9 = self.apos.attachments.url(piece.image9, { size: '350', edit: false })
      var img10 = self.apos.attachments.url(piece.image10, { size: '350', edit: false })
      var hosty = process.env.COWEBSITE



      var htmlmessage = '<body style="border:3px solid #ffa600; color:black;padding:0;">'
        + '<table style="width:100%;border:0;border-collapse:collapse;"><tr>'
        + '<td style="border:0;padding:25px;background:-moz-linear-gradient(top,rgba(112,96,140,1) 0%, rgba(116,121,166,0) 80%,rgba(125,185,232,0) 100%);'
        + 'background: -webkit-linear-gradient(top, rgba(112,96,140,1) 0%,rgba(116,121,166,0) 80%,rgba(125,185,232,0) 100%);'
        + 'background: linear-gradient(to bottom, rgba(112,96,140,1) 0%,rgba(116,121,166,0) 80%,rgba(125,185,232,0) 100%);'
        + 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#70608c\', endColorstr=\'#007db9e8\',GradientType=0 );" width="50%"></td>'
        + '<td align="right" style="padding:25px;border:0;background: -moz-linear-gradient(top, rgba(112,96,140,1) 0%, rgba(116,121,166,0) 80%, rgba(125,185,232,0) 100%);'
        + 'background: -webkit-linear-gradient(top, rgba(112,96,140,1) 0%,rgba(116,121,166,0) 80%,rgba(125,185,232,0) 100%);'
        + 'background: linear-gradient(to bottom, rgba(112,96,140,1) 0%,rgba(116,121,166,0) 80%,rgba(125,185,232,0) 100%);'
        + 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#70608c\', endColorstr=\'#007db9e8\',GradientType=0 );">'
        + '<img src="' + hosty + req.data.global.favicon+'" border="0" style="width:50%"/></td></tr></table>'
        + '<div style="padding:4%"><p style="font-weight:bold;">Dear ' + piece.personName + ',</p>'
      htmlmessage += '<p>Thank you very much for requesting a quote, we will be in touch with you very soon (normally within one business day).</p>'
        + '<p>The following information was submitted to us by you:</p><br/>';
      var htmlfooter = '<p>Our Warmest Regards</p><p>' + process.env.CONAME + ' - ' + process.env.CONUMBER + '</p></div></body>'
      var htmltable = '<table style="width:100%;max-width:100%; padding:15px;border-collapse: collapse">'
        + '<tr><td style="text-align:right;font-weight:bold;border:1px solid #ffa600;padding:15px">Telephone</td><td style="border:1px solid #ffa600;padding:15px">' + piece.telephone + '</td></tr>';


      piece.numberOfRooms.toString().replace('0', '').length > 0 ? htmltable += '<tr><td style="text-align:right;font-weight:bold;border:1px solid #ffa600;padding:15px">No of Rooms</td><td style="border:1px solid #ffa600;padding:15px;width:50%">' + piece.numberOfRooms.toString() + '</td></tr>' : htmltable += '';
      piece.numberOfExtWalls.toString().replace('0', '').length > 0 ? htmltable += '<tr><td style="text-align:right;font-weight:bold;border:1px solid #ffa600;padding:15px">No of External Walls</td><td style="border:1px solid #ffa600;padding:15px">' + piece.numberOfExtWalls.toString() + '</td></tr>' : htmltable += '';

      piece.message.length > 0 ? htmltable += '<tr><td style="text-align:center;font-weight:bold;padding:15px;border:0" colspan="2">Additional Message</td></tr><tr><td colspan="2" align="center" style="border:1px solid #ffa600;padding:15px">' + piece.message + '</td></tr>' : htmltable += '';
      piece.address.length > 0 ? htmltable += '<tr><td colspan="2" style="text-align:center;font-weight:bold;border:0;padding:15px;">Address</td></tr><tr><td colspan="2" align="center" style="border:1px solid #ffa600;padding:15px">' + piece.address + '</td></tr>' : htmltable += '';
      piece.image1 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 1(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img1 + '"/></td></tr>' : htmltable += '';
      piece.image2 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 2(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img2 + '"/></td></tr>' : htmltable += '';
      piece.image3 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 3(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img3 + '"/></td></tr>' : htmltable += '';
      piece.image4 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 4(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%"src="' + hosty + img4 + '"/></td></tr>' : htmltable += '';
      piece.image5 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 5(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img5 + '"/></td></tr>' : htmltable += '';
      piece.image6 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 6(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img6 + '"/></td></tr>' : htmltable += '';
      piece.image7 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 7(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img7 + '"/></td></tr>' : htmltable += '';
      piece.image8 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 8(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img8 + '"/></td></tr>' : htmltable += '';
      piece.image9 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 9(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img9 + '"/></td></tr>' : htmltable += '';
      piece.image10 ? htmltable += '<tr><td colspan="2" style="padding:15px;width:100%;text-align:center;border:0">Photo 10(low quality)</td></tr><tr><td align="center" colspan="2" style="border:1px solid #ffa600;padding:5px"><img style="width:70%;max-width:70%" src="' + hosty + img10 + '"/></td></tr>' : htmltable += '';
      htmltable += '</table><br/><br/>';

      try {
        //console.log( );
        var info = transporter.sendMail({
          from: '"noreply" <' + process.env.EMAILUSER + '>', // sender address
          // from: '"' + process.env.EMAILUSER + '" <' + process.env.EMAILUSER + '>', // sender address
          to: '"' + piece.personName + '" <' + piece.email + '>', // list of receivers
          cc: '"' + process.env.CONAME + '" <' + process.env.COEMAIL + '>',
          bcc: '<' + process.env.BCCEMAIL + '>',
          subject: "Your Quote Request has been received ✔", // Subject line
          html: htmlmessage + htmltable + htmlfooter // html body
        });

        return callback(null);
        //return;
      } catch (e) { console.log(e); return callback(e) }

    }

  }

}
