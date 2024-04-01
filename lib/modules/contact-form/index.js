const path = require("path");
const fs = require("fs");

var nam =process.env.CONAME
var hosty=process.env.COWEBSITE
const nodemailer = require("nodemailer");
try{
var transporter = nodemailer.createTransport({
  host: process.env.EMAILSERVER,
  port: 465,
  secure: true
  , // true for 465, false for other ports
  auth: {
    user: process.env.EMAILUSER, // mail user
    pass: process.env.EMAILPASSWORD // mail password, always use env vars
  },
   tls:{
     ciphers:'SSLv3'
 }
});
}catch(exd){}
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
   name: 'contact-form',        
   extend: 'apostrophe-pieces',        
   label: 'Contact Form',        
   pluralLabel: 'Contact Forms',  
   pathLib : __dirname + '/lib',
   alias : 'contactForms',
   addFields: [
       {
           name : 'personName',
           type : 'string',
           label : 'Full Name',
           placeholder : 'Your Full Name',
           labelShow : true
       },
       {
           name : 'email',
           type : 'string',
           label : 'Email',
           placeholder: 'Your Email',
           labelShow : true
       },
       {
           name : 'message',
           type : 'string',
           label : 'Message',
           placeholder : 'Your Message',
           labelShow : true,
           textarea : true
       }, {
           name: 'date',
           label: 'Date',
           type: 'date',
           readOnly: true,
           sortify: true,
           modal: true
       }
   ],
   addColumns : [
    {
        name : 'email',
        label : 'Email'
    },
    {
        name : 'message',
        label : 'Message'
    }
   ],
   arrangeFields : [
    {
        name : 'allMessage',
        label : 'Message',
        fields : ['date' , 'personName' , 'email' , 'message']
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
       self.allContactSchema();
   },
   construct : function(self,options){
       self.pathLib = options.pathLib;
    fs.readdirSync(self.pathLib).filter((file)=>{
        require(path.resolve(self.pathLib , file))(self,options);
    }),
    self.afterInsert = function(req, piece, options, callback) {
 
        var fontColor='black'
        var color1='rgba(0,0,255,1)'
        var color2='rgba(0,0,255,0.5)'
        var color3='rgba(0,0,255,0)'
        var borderColor="#0000ff"
        var HColor="white"
        var htmlmessage='<body style="border:3px solid'+borderColor+'; color:'+fontColor+';padding:0;">'
        +'<table style="width:100%;border:0;border-collapse:collapse;"><tr>'
        +'<td style="border:0;padding:25px;background:-moz-linear-gradient(top,'+color1+', 0%, '+color2+', 50%,'+color3+', 100%);'
        +'background: -webkit-linear-gradient(top,'+color1+' 0%,'+color2+' 20%,'+color3+' 100%);'
        +'background: linear-gradient(to bottom, '+color1+' 0%,'+color2+' 20%,'+color3+' 100%);"'
        +'width="50%"><h1 style="color:'+HColor+';text-shadow:0 1px 1px #000,0 -1px 1px #000,1px 0 1px #000,-1px 0 1px #000">'+nam+'</h1></td>'
        +'<td align="right" style="border:0;padding:25px;background:-moz-linear-gradient(top,'+color1+', 0%, '+color2+' 20%,'+color3+' 100%);'
        +'background: -webkit-linear-gradient(top, '+color1+' 0%,'+color2+' 20%,'+color3+' 100%);'
        +'background: linear-gradient(to bottom,'+color1+' 0%,'+color2+' 20%,'+color3+' 100%);" width="50%">'
        +'</td></tr></table>'
        +'<div style="padding:4%"><p style="font-weight:bold;word-break: break-all;">Dear '+piece.personName+',</p>'
        htmlmessage+='<p>Thank you very much for the contact, somebody will be in touch with you very soon.</p>'
        +'<p>The following information was submitted by you:</p><br/>';
        var htmlfooter='<p>Our Warmest Regards</p><p>'+nam+'</p><p>Please do not reply to this message, this is an Admin account only - we will reply seperately if needed</p></div></body>'
        var htmltable='<table style="width:100%;max-width:100%; padding:15px;border-collapse: collapse">'
        +'<tr><td style="text-align:right;font-weight:bold;border:1px solid '+color1+';padding:15px">Email</td><td style="border:1px solid '+color1+';padding:15px;word-break: break-all;">'+  piece.email +'</td></tr>';
        piece.message.length>0 ? htmltable+='<tr><td style="text-align:center;font-weight:bold;padding:15px;border:0" colspan="2">Message</td></tr><tr><td colspan="2" align="center" style="border:1px solid '+color1+';padding:15px;word-break: break-all;">'+ piece.message+'</td></tr>':htmltable+='';
        htmltable+='</table><br/><br/>';
        var plaintext= 'Dear '+piece.personName+',\nThank you very much for contacting us, we will be in touch with you very soon.\n\nThe following information was submitted to us:'
        +'\n\nEmail: '+  piece.email ;
        piece.message.length>0 ? plaintext+='\nMessage: '+ piece.message :plaintext+='';
        plaintext+='\n\nOur Warmest Regards\n'+nam+'\nPlease do not reply to this message - we will reply seperately if needed'
        
      try{
      var info = transporter.sendMail({
        from: nam+" - NO REPLY <admin@"+hosty+">", // sender address
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