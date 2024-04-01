

module.exports = {
 
     
  sanitizeHtml: {
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont',
    'input', 'link','meta'
  ],
   allowedClasses:false,
   allowedTags:false,
   allowedAttributes: {
          a: ['href', 'name', 'target'],
          // We don't currently allow img itself by default, but this
          // would make sense if we did
          img: ['src'],
          p : ['class' ,  'data-*'],
          '*': ['style' , 'class'], //this will make sure the style attribute is not stripped off
          font : ['style' ,'face']
        },
     allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel']
  }
};
