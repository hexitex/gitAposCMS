const path = require('path');
const fs = require('fs');
module.exports = {
  pathLib : path.join(__dirname + '/lib/'),
  stylesheets: {
    files : [
          
      // {
      //   name: 'utils/reset',
      //   when: 'always'
      // },
      // {
      //   name : 'pace',
      //   when : 'always'
      // }, {
      //   name: 'font',
      //   when: 'always'
      // }
      // ,
      {
        name: 'site',
        when: 'always'
      }
      ,{
        name: 'style',
        when: 'always'
      },
       {
        name: 'swiper.min',
        when: 'always'
      }, {
        name: 'responsive',
        when: 'always'
      }
   
    ],
    acceptFiles : ["min.css" , "less" , "sass" , "css"]
  },
  scripts: {
    files : [
      {
        name: 'custom',
        when: 'always'
      } , {
        name : 'pace/pace',
        when : 'always'
      }, {
        name: 'swiper/swiper.min',
        when: 'always'
      }, {
        name: 'greensock/*',
        when: 'always'
      }, 
      {
        name: 'markJs/*',
        when: 'always'
      }, {
        name: 'barba/barba',
        when: 'always'
      }, {
        name: 'barbaCustom',
        when: 'always'
      }, 
     
      {
        name : 'lozad/*',
        when : 'always'
      },
      {
        name : 'rellax/*',
        when : 'always'
      },
      {
        name : 'scrollTrigger/*',
        when : 'always'
      }
    ],
    acceptFiles : ["gsap.js" , "js" , "min.js"]
  },
  afterConstruct : function(self){
    // Initialize first and Extend Method Enable
    self.pushAssets();
  },
  construct: function (self, options) {
    self.pathLib = options.pathLib;
    // read all file and include them
    fs.readdirSync(self.pathLib).filter((file)=>{
      require(path.join(self.pathLib + file))(self,options);
    });
  }
}