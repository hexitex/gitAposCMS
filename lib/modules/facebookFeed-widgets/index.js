// const { config } = require("bluebird");


module.exports = {

    extend: 'apostrophe-widgets',
    label: 'Facebook Feed',
    alias: 'facebookFeed',
    contextualOnly:false,
    beforeConstruct: function (self, options) {
     
        options.addFields = [{
                name: 'fburl',
                label: 'Facebook URL',
                type: 'url',
                help: 'Find the page url on facebook that you would like to display the feed from',
                required: true
            },
            {
                name:'width',
                label:'Width in %',
                type:'string',
                def:'100%'
            },
            {
                name:'height',
                label:'Height in %',
                type:'string',
                def:'100%'
            }
        
        ].concat(options.addFields || []);
      
    },
  
    construct: function (self, options) {
    
    }

};