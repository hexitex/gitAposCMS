module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'Squarebox Gallery Image',        
  addFields: [
    {
      name: 'squareName',
      type: 'string',
      label: 'Label your gallery',
      help: 'Must be different name in a page. If not , the gallery will override others',
      def: 'myGallery'
    },
    {
      name: 'squareGallery',
      label: 'Image Gallery Style',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
     //   aspectRatio: [1, 1],
        minSize: [350, 350],
        noHeight: true,
        focalPoint: true,
        extensions: ['jpg', 'gif', 'png']
      }
    },
    {name:'thumbImageSize', label:'Thumb Image size to get from server', help:'Use the focal point on the images to make sure you get what you need from the image (eye icon)',
    type:'select',  
    def:'350',
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
    ]
  },
  {name:'fullImageSize', label:'Full Display image size to get from server', 
  type:'select', 
  def:'720p',
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
  ]
}
  ],
  construct: function (self, options) {
    var superPushAssets = self.pushAssets

    self.pushAssets = function () {
      superPushAssets()

      self.pushAsset('stylesheet', 'squareCSS', {
        when: 'always'
      })
      self.pushAsset('stylesheet', 'venobox', {
        when: 'always'
      })
      self.pushAsset('script', 'initSquare', {
        when: 'always'
      })
      self.pushAsset('script', 'venobox.min', {
        when: 'always'
      })
    }
  }
};