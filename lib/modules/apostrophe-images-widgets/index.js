module.exports = {
  beforeConstruct: function (self, options) {
    options.addFields = [
   
    {
      name: 'hideTitle',
      type: 'boolean',
      label: 'Hide Title ?',
      def : true
    }, {
      name: 'hideCredits',
      type: 'boolean',
      label: 'Hide Credits ?',
      def : true
    }, {
      name: 'hideDescription',
      type: 'boolean',
      label: 'Hide Description ?',
      def : true
    },{
      name: 'hideNavBars',
      type: 'boolean',
      label: 'Hide Nav on multiple images',
      def : true
    },
    {name:'imageSize', label:'Image size to get from server', help:'Use the focal point on the image to make sure you get what you need from the image (eye icon)',
    type:'select',  def:'two-thirds',
     choices:[ 
       { label:'32 x 32 px',  value:'32' }, 
       { label:'64 x 64 px', value:'64' },
    { label:'Scaled - One sixth of orig image', value:'one-sixth' }, 
    { label:'Scaled - One third of orig image', value:'one-third' },
    { label:'Scaled - Two thirds of orig image', value:'two-thirds' }, 
    { label : '350 x 350 px',  value:'350' }, 
    { label : '1920 X 400 px',  value : '1920-400' },
    { label : '1280 X 400 px', value : '1280-400' }, 
    { label : '600 X 600 px',  value : '600' },
    { label:'720p',  value:'720p' }, 
    { label:'1080p', value:'1080p' },
    { label:'300 X 600 px', value:'300-600' }, 
    { label:'600 X 300 px',  value:'600-300' }, 
    { label:'Full!',  value:'full' }
    ]},
    {name:'coverOrContain', label:'Cover or Contain the image', help:'Cover uses all the space and may crop, contain usings the whole image and may leave extra padding',
  
    type:'select',  def:'cover',
    choices:[ 
      { label:'Cover',  value:'cover' }, 
      { label:'Contain', value:'contain' }
   ]
  },
].concat(options.addFields || [])
  },
  construct: function (self, options) {
    var superPushAssets = self.pushAssets

    self.pushAssets = function () {
      superPushAssets()
      self.pushAsset('stylesheet', 'custImage', {when: 'always'})
      // self.pushAsset('stylesheet' , 'user' , {when : 'user'});
      self.pushAsset('script', 'always', {when: 'always'})
    }
  }
}
