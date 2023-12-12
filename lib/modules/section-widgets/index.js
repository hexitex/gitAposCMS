module.exports = {
  extend: 'apostrophe-widgets',
  alias: 'sectionWidgets',
  label: 'Smart Section',
  seo : false,
  openGraph: false,
  
  addFields: [{name: 'nsection', type: 'area', contextual: true}],
    beforeConstruct : function(self,options){
    
    options.addFields = [
    { name: 'navName',  label: 'Name', required: false,  type: 'string' },
    {name: 'showInNav',  label: 'Add Anchor Link in Menu', type: 'boolean',  def: false,
      choices: [{ value: true,  showFields: ['altNavName'] }]},
    {name: 'altNavName',  label: 'Title for the Nav Menu', type: 'string'},
    {name: 'zindex', label: 'Z-Index ONLY USE THIS FOR Video backgrounds, it will interfear with the UI, set it to 0 or 1 to disable',  help: 'The Z space ordering - this is the stack order of sections',
      type: 'range', def: 1, min: 0, max: 99, step: 1},
   
    {name: 'backgroundHeight', label: 'Height of the section in Device view height', help: 'Change to Pixels = nnnpx or device View Height nnnvh',
      type: 'string',  def: '100%', required: true},
    {name: 'backgroundWidth', label: 'Width of the section in Device view width', help: 'Change to Pixels = nnnpx or device View Height nnnvh',
      type: 'string', def: '100%', required: true},
    {name: 'oShadowBox', type: 'select', label: 'Borders', help: 'Applies a shadow or border',  def: '',
      choices: [{label: 'None', value: ''},
        {label: 'Shadow Box', value: 'shadow-box-sq-', showFields: [ 'oShadow','oBorder','oBorderSize','oRadius','oTop','oLeft','oRight','oBottom'] },
        {label: 'Radius Only',  value: 'rad', showFields: [ 'oRadius','oTop','oLeft','oRight','oBottom' ] },
        {label: 'Border Only', value: 'borderOnly', showFields: [ 'oBorder','oRadius','oBorderSize','oTop','oLeft','oRight','oBottom' ] }
      ]
    },
    {name:'oBorder', label:'Border Color', type:'select',  def:'light-border',
      choices:[ { label: 'None',  value: 'none-border' }, { label: 'White Border',  value: 'white-border' },
        { label: 'Light Border', value: 'light-border' }, { label: 'Med Border', value: 'med-border' },
        { label: 'Dark Border',  value: 'dark-border' }, { label: 'Black Border', value: 'black-border' },
        { label: 'Highlight Border', value: 'highlight-border' },
    ]
    },
    {name:'oBorderSize', label:'Border Size', type:'select',  def:'border-small',
      choices:[ { label:'none',  value:'nosize-border' }, { label: 'Small',  value: 'border-small' },
        { label: 'Medium',  value: 'border-med'  }, { label: 'Large',  value: 'border-large' },
        { label: 'Max',  value: 'border-max' }
    ]
    },
    {name:'oRadius', label:'Radius extent', type:'select',  def:'',
      choices:[ { label:'none',value:'' }, { label:'Small', value:'rad-small' },
      { label:'Medium', value:'rad-med' }, { label:'Large', value:'rad-large' },
      { label:'Max', value:'rad-max' }
    ]
    },
    {name:'oShadow',  label:'Shadow extent', type:'select', def:'small',
      choices:[ { label:'Small',  value:'small' }, { label:'Medium', value:'med' },
      { label:'Large', value:'large' }, { label:'Max', value:'max' }
    ]
    },
    {name:'oTop', label:'Apply to top borders', type:'boolean', def:true},
    {name:'oBottom', label:'Apply to bottom borders', type:'boolean', def:true},
    { name:'oLeft', label:'Apply to left borders', type:'boolean', def:true },
    {name:'oRight', label:'Apply to right borders',type:'boolean', def:true },
  
    {name:'staticBackground', label:'Fix the image in place ', help:'Check for background image to stay put during desktop scrolling',
      type:'boolean',  def:true},
    {name: 'uOTransition', label: 'Transition Section', type: 'boolean',  def: false,
       choices: [{ value: true,
        showFields: ['firstPage','oTransition', 'oTransitionSpeed','oTransitionOpacity','oTransitionBlur','oTransitionContrast','oTransitionSaturation','oTransitionBrightness']
      }]
    },
    {name:'firstPage', label:'Is this to be animated regardless of scroll position? (Normally YES for banner page animations and NO for other transitions down the page)',
      help:'Animated transitions happen on page load and are not repeatable - no delay!',
      type:'boolean',  def:false,
      choices: [{ value: false,
        showFields: ['oTransitionDelay','oOnce','oCenterVertical','oCenterHorizontal','oOffSetString']
      }]},
    {name:'oCenterVertical',
      label:'Apply the transition when at least half the section is visible in the verticle plain, normal pages',
      type:'boolean', def:true},
    {name:'oCenterHorizontal',
      label:'Apply the transition when at least half the section is visible in the Horizontal plain, Horizontal pages',
      type:'boolean', def:false },
    {name:'oOffSetString', label:'https://github.com/terwanerik/ScrollTrigger , use the syntax for the datascroll element e.g offset(0,-500px) for a -500px y offset for the trigger into the viewport',
      type:'string', def:'' },
    {name: 'oTransition', type: 'select', label: 'Section transition', help: 'Apply a transition effect to section',
      def: '',
      choices: [{ label: 'Fade in',  value: 'fade-in' }, { label: 'Slide from left', value: 'slide-left' },
        { label: 'Slide from right', value: 'slide-right' }, { label: 'Slide from bottom',  value: 'slide-bottom' },
        { label: 'Slide from top', value: 'slide-top' }, { label: 'Zoom in', value: 'zoom-in' },
        { label: 'Zoom out',  value: 'zoom-out' }, { label: 'Snap in', value: 'snap-in' },
        { label: 'Snap out', value: 'snap-out' },{ label: 'Flip Horizonal', value: 'flip-horz' },{ label: 'Flip Verticle', value: 'flip-vert' },
        { label: 'Flip Both', value: 'flip-both' }, { label: 'Plus Rotate', value: 'plus-rotate' }, { label: 'Minus Rotate', value: 'minus-rotate' },
        { label: 'Clip Star', value: 'clip-star' }, { label: 'Clip Circle', value: 'clip-circle' }
    
      ]
    },
    {name: 'oTransitionSpeed', label: 'Transition speed in ms','help': '1000 is 1 second', type: 'range', def: 500,
      min: 50, max: 10000, step: 50 },
    {name: 'oTransitionDelay', label: 'Transition delay in ms', 'help': '1000 is 1 second', type: 'range', def: 0,
      min: 0, max: 10000, step: 50 },
      {name: 'oTransitionOpacity', label: 'Transition Starting Opacity', type: 'range', def: 0,
      min: 0, max: 1, step: 0.1 },
      {name: 'oTransitionBlur', label: 'Transition Starting Blur', type: 'range', def: 0,
      min: 0, max: 250, step: 1 },
    {name: 'oTransitionContrast', label: 'Transition Starting Contrast', type: 'range', def: 100,
      min: 0, max: 1000, step: 1 },
      {name: 'oTransitionSaturation', label: 'Transition Starting Saturation', type: 'range', def: 100,
      min: 0, max: 1000, step: 1 },
      {name: 'oTransitionBrightness', label: 'Transition Starting Brightness', type: 'range', def: 100,
      min: 0, max: 1000, step: 1 },
    {name:'oOnce', label:'Use effect only once', help:'If checked the transition will only play once', 
    type:'boolean', def:true },
    {name: 'outerColor',label: 'Section Colour', type: 'color', def: '' },
    {name: 'outerColorOpacity', label: 'Opacity of COLOUR','help': '1.0 is full and 0 is none', type: 'range',
      def: 1.0, min: 0.0, max: 1.0, step: 0.01 },
    {name: 'outerOpacity', label: 'Opacity of whole section',
      type: 'range', def: 1.0, min: 0.0, max: 1.0, step: 0.01 },
    {name: 'outerImage',label: 'Section Background Image',  type: 'singleton',widgetType: 'apostrophe-images', 
    options: {limit: 1, crop:true,  focalPoint:true }},
    {name:'coverOrContain',
    label:'Background is Covered or Contains Image?',
    type:'select',def:'cover',
    choices:[{label:'cover',value:'cover'},{label:'contain',value:'contain'}]},
    {name:'outerSize', label:'Image size to get from server', help:'Use the focal point on the image to make sure you get what you need from the image (eye icon)',
      type:'select',  def:'720p',
       choices:[ { label:'32 x 32 px',  value:'32' }, { label:'64 x 64 px', value:'64' },
      { label:'Scaled - One sixth of orig image', value:'one-sixth' }, { label:'Scaled - One third of orig image', value:'one-third' },
      { label:'Scaled - Two thirds of orig image', value:'two-thirds' }, { label:'Scaled - Half orig image',  value:'half'},
      { label : '300 x 300 px',  value:'300' }, { label : '1920 X 400 px',  value : '1920-400' },
      { label : '1280 X 400 px', value : '1280-400' }, { label : '600 X 600 px',  value : '600' },
      { label:'720p',  value:'720p' }, { label:'1080p', value:'1080p' },
      { label:'300 X 600 px', value:'300-600' }, { label:'600 X 300 px',  value:'600-300' }, { label:'Full!',  value:'full' }
      ]
    },
    {name: 'backgroundVideo', label: 'Use MP4 Video as the Background', type: 'boolean', def: false,
      choices: [{ value: true, showFields: ['outerVideo', 'loop', 'mute','posterImage','posterSize' ]}] },
    {name: 'outerVideo', label: 'Video URL', type: 'url' },
    {name: 'loop', label: 'Loop the Video forever', type: 'boolean', def: true },
    {name: 'mute', label: 'Mute Sound for the Video', type: 'boolean', def: true },
    {name: 'posterImage',label: 'Poster Image for Video',  type: 'singleton',widgetType: 'apostrophe-images', 
    options: {limit: 1, crop:true,  focalPoint:true }},
    {name:'posterSize', label:'Image size to get from server', help:'Use the focal point on the image to make sure you get what you need from the image (eye icon)',
    type:'select',  def:'full',
     choices:[ { label:'32 x 32 px',  value:'32' }, { label:'64 x 64 px', value:'64' },
    { label:'Scaled - One sixth of orig image', value:'one-sixth' }, { label:'Scaled - One third of orig image', value:'one-third' },
    { label:'Scaled - Two thirds of orig image', value:'two-thirds' }, { label:'Scaled - Half orig image',  value:'half'},
    { label : '350 x 350 px',  value:'350' }, { label : '1920 X 400 px',  value : '1920-400' },
    { label : '1280 X 400 px', value : '1280-400' }, { label : '600 X 600 px',  value : '600-600' },
    { label:'720p',  value:'720p' }, { label:'1080p', value:'1080p' },
    { label:'300 X 600 px', value:'300-600' }, { label:'600 X 300 px',  value:'600-300' }, { label:'Full!',  value:'full' }
    ]
  },
    {name: 'outerParallax', label: 'Use Parallax Effect on section', help: 'Caution on Navigation items or Transitions! Things don\'t add up and slow down if used with other effects',
      type: 'boolean',  def: false,
      choices: [{ value: true,
        showFields: [ 'outerParallaxSpeed', 'outerParallaxZIndex', 'outerParallaxPercentage' ]
      }]
    },
    {name: 'outerParallaxSpeed', label: 'Speed of parallax effect minus numbers slow the section', 'help': '-2 or 2 is a good smooth speed', 
    type: 'range', def: -2, min: -20, max: 20, step: 0.1 },
    {name: 'outerParallaxZIndex', label: 'Z-Index of the Section', type: 'range',  def: 1,  min: -200,  max: 200, step: 1 },
    {name: 'outerParallaxPercentage', label: 'Centering Paralax in the Viewport','help': 'The centering percentage for the section viewport, 0.5 will place it in the center (pre-effect), a value of 1 moves it higher and a minus value moves it lower - it can be tricky playabout',
      type: 'range', def: 0.5, min: -5, max: 5, step: 0.1 },
   
      
    {name: 'overridePadding', label: 'Override Padding of section', 'help': 'Padding is internal space around content', type: 'boolean',
      def: false,
      choices: [{ value: true, showFields: ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom' ] }] },
    {name: 'paddingLeft', label: 'Left Padding of the section in pixels(PX) or Percent(%) (padding is internal space)',
      type: 'string', def: '40px' },
    {name: 'paddingRight', label: 'Right Padding of the section in pixels(PX) or Percent(%) ', type: 'string', def: '40px' },
    {name: 'paddingTop', label: 'Top Padding of the section in pixels(PX) or Percent(%) ',  type: 'string', def: '40px' },
    {name: 'paddingBottom', label: 'Bottom Padding of the section in pixels(PX) or Percent(%)', type: 'string', def: '40px' },
    {name: 'overrideMargins', label: 'Override Margins of section', 'help': 'Margins are external space around section', type: 'boolean', def: false,
      choices: [{value: true, showFields: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom' ]
      }]
    },
    {name: 'marginLeft', label: 'Left Margin of the section in pixels(PX) or Percent(%) or auto (margin is external space for the section)',
      type: 'string', def: 'auto' },
    {name: 'marginRight', label: 'Right margin of the section in pixels(PX) or Percent(%) or auto', type: 'string', def: 'auto' },
    {name: 'marginTop', label: 'Top Margin of the section in pixels(PX) or Percent(%) or auto', type: 'string', def: 'auto' },
    {name: 'marginBottom', label: 'Bottom Padding of the section in pixels(PX) or Percent(%) or auto', type: 'string', def: 'auto' },
   
    {name: 'position', label: 'Position', 'help': 'Fix(ed) the whole section to a point on the screen and keep it there regardless of scroll position or make it stick(y) after you have scrolled past it. Don\'t use effects like transitions and parallax and only use percentage values for positions unless you know what you are doing',
        type: 'select', def: '', choices: [{label: 'Normal', value: '',},
        {label: 'Absolute', value: 'absolute', showFields: ['xPos', 'yPos'] },
          {label: 'Fixed', value: 'fixed', showFields: ['xPos', 'yPos'] },
          {label: 'Sticky', value: 'sticky', showFields: ['yPos'] } ] },
    {name: 'xPos', label: ' X position in percent ( % ) view width ( vw ) or pixels ( px )', type: 'string',  def: '0' },
    {name: 'yPos', label: ' y position in percent ( % ) view height ( vh ) or pixels ( px )', type: 'string', def: '0' },
    {name:'filter', label: 'Apply Filter', 'help': 'Apply an image filter on the content for this section', type: 'select', label: 'Add an image filter', 'help': 'Add a filter to this content, use Always to show the effect when editing',def: "false", 
    choices: [{label: 'Yes',value: "true", showFields: ['backdrop','blur', 'brightness', 'contrast', 'grayscale','hue','invert','saturate','sepia','outerOpacity' ]
    },{label: 'Always',value: "Always", showFields: ['backdrop','blur', 'brightness', 'contrast', 'grayscale','hue','invert','saturate','sepia','outerOpacity' ]
  },{label: 'No',value: "false"}
  ]
    },
    {name:'backdrop', label: 'Filter Backdrop Only', 'help': 'Apply an image filter to the background only(underlaying section)', type: 'boolean', def: true },
    {name: 'blur', label: 'Blur Amount', type: 'range', def: '0',
    min: 0, max: 50, step: 1 },
    {name: 'brightness', label: 'Brightness', type: 'range', def: '1',
    min: 0, max: 10, step: 0.1 },
    {name: 'contrast', label: 'Contrast', type: 'range', def: '1',
    min: 0, max: 10, step: 0.1 },
    {name: 'grayscale', label: 'Gray Scale', type: 'range', def: '0',
    min: 0, max: 1, step: 0.01 },
    {name: 'hue', label: 'Hue Rotate', type: 'range', def: '0',
    min: 0, max: 360, step:1 },
    {name: 'invert', label: 'Invert', type: 'range', def: '0',
    min: 0, max: 1, step:0.01 },
    {name: 'saturate', label: 'Saturate', type: 'range', def: '1',
    min: 0, max: 10, step:0.1 },
    {name: 'sepia', label: 'Sepia', type: 'range', def: '0',
    min: 0, max: 1, step:0.01 },
  
  
  
  ].concat(options.addFields || []);

options.arrangeFields = options.arrangeFields || [

    {name: 'brief', label: 'Basic Settigs', fields: ['navName', 'showInNav', 'altNavName','zindex','position','xPos','yPos'] },
    {name:'sizes', label:'Widths & Heights', fields: ['backgroundHeight', 'backgroundWidth','height', 'width'] },
      {name:'borders', label:'Borders', fields:['oShadowBox','oBorder','oRadius','oBorderSize','oShadow','shadowBox','oTop','oBottom','oLeft','oRight'] },
      {name: 'outerSection',  label: 'Background',
        fields: ['outerColor','outerColorOpacity', 'outerImage','coverOrContain','outerSize','staticBackground', 'backgroundVideo', 'outerVideo', 'loop', 'mute','posterImage','posterSize']
      },
        {name:'paddings', label:'Padding and Margins',
        fields:['overridePadding', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'overrideMargins', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom']
      },
      {name: 'otransitions', label: 'Transition Effects',
        fields: ['uOTransition', 'firstPage','oTransition', 'oTransitionSpeed','oTransitionDelay','oTransitionOpacity','oTransitionBlur','oTransitionContrast','oTransitionSaturation','oTransitionBrightness','oOnce','oCenterVertical','oCenterHorizontal','oOffSetString']
      },
       {name: 'oparallax', label: 'Parallax Section',
        fields: ['outerParallax', 'outerParallaxSpeed', 'outerParallaxZIndex', 'outerParallaxPercentage']
      },
      {name: 'filter', label: 'Filters', 
      fields: ['filter','backdrop','blur', 'brightness','contrast','grayscale','hue','invert','saturate','sepia','outerOpacity'] },
   
 
    ];
  },
  construct: function (self, options) {
// convertHex helper can be removed for new installs as the color picker now supports alpha
    self.addHelpers({
      convertHex: function(hex,alpha) {
        hex = hex.replace('#','');
              var bigint = parseInt(hex, 16);
              var r = (bigint >> 16) & 255;
              var g = (bigint >> 8) & 255;
              var b = bigint & 255;
              return "rgba("+r+","+g+","+b+","+alpha+")";
          },
          getUID:function(){
            var d=new Date();
            return d.getTime()+'-'+Math.round(Math.random(100000)*(Math.random(100000)*100000));
          }
    });
    
      self.pushAsset('stylesheet', 'section', {
        when: 'always'
      });
    
  },
};