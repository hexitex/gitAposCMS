const path = require("path");
const fs = require("fs");


const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true
  , // true for 465, false for other ports
  auth: {
    user: 'admin@podbit.com', // mail user
    pass: process.env.ZOHOPASSWORD // mail password, always use env vars
  },
   tls:{
     ciphers:'SSLv3'
 }
});
function getDate(){ 
  var year = new Date().getFullYear()
  var month = (new Date().getMonth() < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
  var day = (new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate()
  var date = [
      [year],
      [month],
      [day]
  ]
//  date.join('-')
  return date.join('-');
}
function getNumberDate(){ 
  var year = new Date().getFullYear()
  var month = (new Date().getMonth() < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
  var day = (new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate()
  var hour= new Date().getHours();
  var min= new Date().getMinutes();
  var sec= new Date().getSeconds();
  var ms= new Date().getMilliseconds();
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
function getTitle(){
  return getNumberDate();
}
module.exports = {        
   name: 'member-form',        
   extend: 'apostrophe-pieces',        
   label: 'Member Form',        
   pluralLabel: 'Members',  
   pathLib : __dirname + '/lib',
   alias : 'memberForms',
   addFields: [
       {
           name : 'first',
           type : 'string',
           label : 'First Name',
           placeholder : 'Your First Name',
           labelShow : true
       },
       {
        name : 'last',
        type : 'string',
        label : 'Surname',
        placeholder : 'Your Surname',
        labelShow : true
    },
       {
           name : 'emailAddress',
           type : 'string',
           label : 'Email',
           placeholder: 'Your Email',
           labelShow : true
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
      required: false
    },
    {
      name: 'town',
      label: 'Town',
      placeholder: 'Town',
      type: 'string',
      required: false
    },
    {
      name: 'county',
      label: 'County',
      placeholder: 'County',
      type: 'string',
      required: false
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
      label: 'Photo',
      type: 'attachment',
      help: 'Your icon',
      widgetControls: true,
      extensions: ['gif', 'jpg', 'png'],
      options: {
        aspectRatio: [1, 1],
        limit: 1,
      }
    },
    {
      name: 'pass',
      label: 'Password',
      placeholder: 'Password',
      type: 'password',
      required: true
    },
      //  {
      //      name : 'message',
      //      type : 'string',
      //      label : 'Message',
      //      placeholder : 'Your Message',
      //      labelShow : true,
      //      textarea : true
      //  }, 
      //  {
      //      name: 'date',
      //      label: 'Date',
      //      type: 'date',
      //      readOnly: true,
      //      sortify: true,
      //      modal: true
      //  }
   ],
   addColumns : [
    {
        name : 'emailAddress',
        label : 'Email'
    },
    {
        name : 'first',
        label : 'first'
    }
    ,
    {
        name : 'last',
        label : 'last'
    }
   ],
  //  arrangeFields : [
  //   {
  //       name : 'allMessage',
  //       label : 'Message',
  //       fields : ['date' , 'personName' , 'email' , 'message']
  //   },
  //   {
  //       name : 'Configs',
  //       label : 'Configurations',
  //       fields : ['title' , 'slug' , 'published' , 'tags'],
  //       last : true
  //   }
  //  ],
   permissionsFields : false,
   seo : false,
   openGraph : false,
   afterConstruct : function(self){
       self.allMemberSchema();
   },
   construct : function(self,options){
       self.pathLib = options.pathLib;
    fs.readdirSync(self.pathLib).filter((file)=>{
        require(path.resolve(self.pathLib , file))(self,options);
    }),
    self.afterInsert = function(req, piece, options, callback) {

        var hosty='https://www.podbit.com/'
        var htmlmessage='<body style="border:3px solid #0000ff; color:black;padding:0;">'
        +'<table style="width:100%;border:0;border-collapse:collapse;"><tr>'
        +'<td style="border:0;padding:25px;background:-moz-linear-gradient(top,rgba(0,0,255,1) 0%, rgba(0,0,255,0.5) 50%,rgba(0,0,255,0) 100%);'
        +'background: -webkit-linear-gradient(top, rgba(0,0,255,1) 0%,rgba(0,0,255,0.5) 20%,rgba(0,0,255,0) 100%);'
        +'background: linear-gradient(to bottom, rgba(0,0,255,1) 0%,rgba(0,0,255,0.5) 20%,rgba(0,0,255,0) 100%);"'
        +'width="50%"><h1 style="color:white;text-shadow:0 1px 1px #000,0 -1px 1px #000,1px 0 1px #000,-1px 0 1px #000">Podbit</h1></td>'
        +'<td align="right" style="border:0;padding:25px;background:-moz-linear-gradient(top,rgba(0,0,255,1) 0%, rgba(0,0,255,0.5) 20%,rgba(0,0,255,0) 100%);'
        +'background: -webkit-linear-gradient(top, rgba(0,0,255,1) 0%,rgba(0,0,255,0.5) 20%,rgba(0,0,255,0.5) 100%);'
        +'background: linear-gradient(to bottom, rgba(0,0,255,1) 0%,rgba(0,0,255,0.5) 20%,rgba(0,0,255,0) 100%);" width="50%">'
        +'</td></tr></table>'
        +'<div style="padding:4%"><p style="font-weight:bold;word-break: break-all;">Dear '+piece.personName+',</p>'
        htmlmessage+='<p>Thank you very much for the contact, somebody will be in touch with you very soon.</p>'
        +'<p>The following information was submitted by you:</p><br/>';
        var htmlfooter='<p>Our Warmest Regards</p><p>Podbit</p><p>Please do not reply to this message, this is an Admin account only - we will reply seperately if needed</p></div></body>'
        var htmltable='<table style="width:100%;max-width:100%; padding:15px;border-collapse: collapse">'
        +'<tr><td style="text-align:right;font-weight:bold;border:1px solid blue;padding:15px">Email</td><td style="border:1px solid blue;padding:15px;word-break: break-all;">'+  piece.email +'</td></tr>';
        piece.message.length>0 ? htmltable+='<tr><td style="text-align:center;font-weight:bold;padding:15px;border:0" colspan="2">Message</td></tr><tr><td colspan="2" align="center" style="border:1px solid blue;padding:15px;word-break: break-all;">'+ piece.message+'</td></tr>':htmltable+='';
        htmltable+='</table><br/><br/>';
        var plaintext= 'Dear '+piece.personName+',\nThank you very much for contacting us, we will be in touch with you very soon.\n\nThe following information was submitted to us:'
        +'\n\nEmail: '+  piece.email ;
        piece.message.length>0 ? plaintext+='\nMessage: '+ piece.message :plaintext+='';
        plaintext+='\n\nOur Warmest Regards\nPodbit\nPlease do not reply to this message - we will reply seperately if needed'
        
      try{
      var info = transporter.sendMail({
        from: '"Podbit - NO REPLY" <admin@podbit.com>', // sender address
        to:'"'+piece.personName+'" <'+piece.email+'>', // list of receivers
        bcc:'<rmcglade@gmail.com>',
        subject: "Your message has been received ✔", // Subject line
        text: plaintext, // plain text body
        html: htmlmessage+htmltable+htmlfooter // html body
      });
      return callback(null);
    }catch(e){console.log(e); return callback(e)}
  
    }


   }
};