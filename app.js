var path = require('path')

module.exports = require('apostrophe')({
  root: module,


  shortName: 'podbit',
  // baseUrl: 'https://www.podbit.com',

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.
  bundles: ['apostrophe-blog'],
  modules: {

    'apostrophe-rich-text-permalinks': {
      playerData: false,
      join: {
        // Either a page or a blog post
        withType: '',
        withType: ['apostrophe-page', 'blog', 'apostrophe-file', 'ecom-product']
      }
    },
    'apostrophe-headless': {
      // cors: {
      //   "origin": "http://localhost:3001",
      //   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      //   "preflightContinue": false,
      //   "optionsSuccessStatus": 200,
      //   "credentials":true,
      //   "allowedHeaders":"Content-Type,Authorization,Origin, Content-Type, Accept"

      // },
      playerData: false
    },

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.
    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // FORGOT PASSWORDS
    'apostrophe-email': {
      // See the nodemailer documentation, many
      // different transports are available, this one
      // matches how PHP does it on Linux servers
      nodemailer: {
        host: "smtp.zoho.com",
        port: 465,
        secure: true
        , // true for 465, false for other ports
        auth: {
          user: 'admin@podbit.com', // generated ethereal user
          pass: process.env.ZOHOPASSWORD // generated ethereal password
        },
        tls: {
          ciphers: 'SSLv3'
        }
      }
    },
    // this plugin is added to ckeditor
    'openAI': {
      secretKey: process.env.OPENAI_SECRET

    },
    //server for phone sim
    'phoneSim': {},
    // 'apostrophe-login': {
    //   passwordReset: true,
    //   // The default: you have 48 hours to use a password reset link,
    //   // once it is sent to you
    //   passwordResetHours: 48
    // },

    // APOS ATTACHMENTS
    'apostrophe-attachments': {
      svgImages: true,

      addImageSizes: [

        {
          name: '1280-400',
          width: 1280,
          height: 400
        },
        {
          name: '350',
          width: 350,
          height: 350
        },
        {
          name: '720p',
          width: 1280,
          height: 720
        },
        {
          name: '1080p',
          width: 1920,
          height: 1080
        },

        {
          name: '64',
          width: 64,
          height: 64
        },
        {
          name: '32',
          width: 32,
          height: 32
        },

        {
          name: '300-600',
          width: 300,
          height: 600
        },
        {
          name: '600-300',
          width: 600,
          height: 300
        },
        {
          name: '600',
          width: 600,
          height: 600
        },
        {
          name: '1920-400',
          width: 1920,
          height: 400
        }
      ],
      fileGroups: [
        {
          name: 'images',
          label: 'Images',
          extensions: ['gif', 'jpg', 'png', 'svg'],
          extensionMaps: {
            jpeg: 'jpg'
          },
          // uploadfs should treat this as an image and create scaled versions
          image: true
        },
        {
          name: 'office',
          label: 'Office',
          extensions: [
            'txt',
            'rtf',
            'pdf',
            'xls',
            'ppt',
            'doc',
            'pptx',
            'sldx',
            'ppsx',
            'potx',
            'xlsx',
            'xltx',
            'csv',
            'docx',
            'dotx',
            'mp4',
            'html',
            'htm',
            'odt',
            'ods',
          'zip'],
          extensionMaps: {},
          // uploadfs should just accept this file as-is
          image: false
        }
      ]

    },

    //SEO
    'apostrophe-seo': { playerData: false },
    'barbajs': { playerData: false, enable: true },
    // APOS ORDERING
    'apostrophe-pieces-orderings-bundle': {},
    'apostrophe-blog': { orderings: true },
    'apostrophe-blog-orderings': { extend: 'apostrophe-pieces-orderings', openGraph: false },
    'apostrophe-blog-pages': { orderings: true },

    'apostrophe-second-chance-login': {},
    'apostrophe-forms': {
      // Best practice: set to first or last so that inputs are nested in labels
      // and easier to style
      optionLabelPosition: 'last'
    },

    'apostrophe-blog': { playerData: false },
    'apostrophe-blog-widgets': { playerData: false },

    // EXPRESS NODEJS
    'apostrophe-express': {

      csrf: false
      //,
      // csrf: {
      //  //exceptions: [ '/paypal/complete' ]
      // }
    },
    'apostrophe-permissions': {
      construct: function (self, options) {
        self.addPublic('edit-attachment');
      }
    },

    // // WORKFLOW

    // 'apostrophe-workflow': {
    //   // IMPORTANT: if you follow the examples below,
    //   // be sure to set this so the templates work
    //   alias: 'workflow',
    //   //defaultMode :'live',
    //   // Recommended to save database space. You can still
    //   // export explicitly between locales
    //   replicateAcrossLocales: false,
    //   locales: [
    //     {
    //       name: 'default',
    //       label: 'Master',
    //       private: false,
    //       children: [
    //         {
    //           name: 'en',
    //           label: 'English'
    //         }
    //       ]
    //     },
    //   ],
    //   defaultLocale: 'default',
    //   excludeTypes: ['likes', 'contact-form', 'email-signup-form', 'comments','tags','reviews','member-forms'],
    //   excludeProperties: ['numberVisits'],

    // },

    // 'apostrophe-workflow-modified-documents': {},

    // APOS SEARCH
    'apostrophe-search': {
      types: ['default',
        'apostrophe-blog',
        // 'member',
        'likeHome',
        'ecom-products'
      ]
    },



    // APOS GLOBAL

    'apostrophe-global': {
      seoGoogleFields: true, playerData: false
    },


    'apostrophe-site-map': {
      // array of doc types you do NOT want
      // to include, even though they are
      // accessible on the site. You can also
      // do this at the command line.
      excludeTypes: []
    },

    'apostrophe-optimizer': {
      enable: false,
      stats: false,
      debug: false
    },

    // APOS OPEN GRAPH FACEBOOK
    'apostrophe-open-graph': { playerData: false },

    // PAGE CURSORS
    'extend-page-cursors': { playerData: false },
    'scene-user-pages': { scene: 'user' },
    // APOS PAGES
    'apostrophe-pages': {
      playerData: false,

      types: [
        {
          name: 'likeHome',
          label: 'Default',

        },
        {
          name: 'apostrophe-blog-page',
          label: 'Article'
        },

        {
          name: 'home',
          label: 'Home'
        },
        {
          name: 'templateSections-page',
          label: 'Section Templates'
        },
        {
          name: 'ecom-products-pages',
          label: 'Product'
        },
        // ,
        // {
        //   name: 'member-page',
        //   label: 'Members'
        // },
        // {
        //   name: 'memberLookup-page',
        //   label: 'Members Self Lookup'
        // }

      ]

    },
    'ecom-paypal': {
      mode: process.env.PAYPAL_MODE, // sandbox or live
      secret: process.env.PAYPAL_SECRET,
      clientID: process.env.PAYPAL_CLIENTID,
      playerData: false
    },

    // CUSTOM ASSETS
    'my-theme': {},

    'apostrophe-users': { playerData: false },
    'apostrophe-groups': { playerData: false },
    'templateSections': { export: true, playerData: false, restApi: true },
    'templateSections-pages': { extend: 'apostrophe-pieces-pages', playerData: false },
    'comments': { export: true },
    'likes': { playerData: false },
    'contact-form': { playerData: false, export: true, import: true },
    'member-form': { playerData: false, export: true, import: true },
    // 'member-pages': { playerData: false },
    // 'memberLookup-pages': { playerData: false },
    'email-signup-form': { export: true },
    'apostrophe-area-structure': {},
    'apostrophe-pieces-import': { playerData: false },
    //export to cvs
    'apostrophe-pieces-export': { playerData: false },
    'ecom-global': {},
    'ecom-category': { import: true, export: true, playerData: false },
    'ecom-subcategory': { import: true, export: true, playerData: false },
    'ecom-subcategory-widgets': { playerData: false },
    'ecom-product': { import: true, export: true, playerData: false },
    'ecom-products-pages': {},
    'ecom-shippings': { export: true, playerData: false },
    'ecom-cart': { playerData: false },
    'ecom-pos': { playerData: false },
    'ecom-orders': { import: true, export: true, playerData: false },
    'ecom-emails': { playerData: false },
    'reviews': { export: true },


    //WIDGETS
    'apostrophe-twitter': {},
    'reviews-widgets': { playerData: false },
    'apostrophe-twitter-widgets': {
      consumerKey: process.env.TWITTERCONSUMERKEY,
      consumerSecret: process.env.TWITTERCONSUMERSECRET,
      accessToken: process.env.TWITTERACCESSTOKEN,
      accessTokenSecret: process.env.TWITTERACCESSTOKENSECRET
      //,
      //playerData: false
    },
    'apostrophe-link-widgets': { playerData: false },
    'apostrophe-forms-widgets': { disableBaseStyles: true },
    'apostrophe-forms-text-field-widgets': {},
    'apostrophe-forms-textarea-field-widgets': {},
    'apostrophe-forms-file-field-widgets': {},
    'apostrophe-forms-select-field-widgets': {},
    'apostrophe-forms-radio-field-widgets': {},
    'apostrophe-forms-checkboxes-field-widgets': {},
    'apostrophe-forms-boolean-field-widgets': {},
    'apostrophe-forms-conditional-widgets': {},
    'videos-widgets': { playerData: false },
    'spacer-widgets': { playerData: false },
    'iframe-widgets': { playerData: false },
    'squarebox-gallery-widgets': { playerData: false },
    'album-gallery-widgets': {},
    'contact-section-widgets': { playerData: false },
    'member-section-widgets': { playerData: true },
    'email-signup-section-widgets': { playerData: false },
    'two-columns-widgets': { playerData: false },
    'three-columns-widgets': { playerData: false },
    'one-columns-widgets': { playerData: false },
    'email-signup-form-widgets': { playerData: false },
    'contact-form-widgets': { playerData: false },
    'member-form-widgets': { playerData: true },
    'likes-widgets': { playerData: false },
    'comments-widgets': { playerData: false },
    // 'facebookFeed-widgets': { playerData: false },
    'section-widgets': { playerData: false },
    'diagramEditor-widgets': { playerData: false },
    'templateSections-widgets': {
      playerData: false
    },
    'apostrophe-dialog-box': {},
    'apostrophe-dialog-box-modal': {},
    // optional index page for dialog boxes, useful if dialog styles conflict with apos modal styles
    'apostrophe-dialog-box-pages': {},
    'apostrophe-palette-admin-bar': {},
    'apostrophe-palette-widgets': {},
    'apostrophe-palette': {},
    
    // ADMIN BAR
    'apostrophe-admin-bar': {
      addGroups: [
        // {
        //   label: 'Templates',
        //   items: [
        //     'templateSections',
        //   ]
        // },
        {
          label: 'Admin',
          items: [
            'apostrophe-users',
            'apostrophe-groups',
            'apostrophe-tags',
            'apostrophe-pages',
            'apostrophe-dialog-box',
            'apostrophe-forms',
            'apostrophe-global',
            // 'apostrophe-workflow',
            'apostrophe-files',
            'apostrophe-images',



          ]
        },
        {
          label: 'Content',
          items: [
            'apostrophe-blog',
            'contact-form',
            'likes',
            'email-signup-form',
            'comments',
            'templateSections',
          ]
        },
        {
          label: 'Ecommerce',
          items: [
            'ecom-category',
            'ecom-subcategory',
            'ecom-product',
            'ecom-orders',
            'ecom-shippings',
            'reviews',
            'member-form',
            'ecom-emails'
          ]
        },
      ]
    },

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') },
    'apostrophe-db': {
      uri: process.env.MONGO_URL
    },
    // 'member-form-submit-widgets': {
    //   playerData: true,
    //   extend: 'apostrophe-pieces-submit-widgets',
    //   scene: 'user',
    //   // Always spell out the schema field names the user is allowed to edit.
    //   // You almost certainly don't want them to have control
    //   // of the "published" field, for instance
    //   fields: ['first', 'last','pass','emailAddress', 'mobile', 'address1','address2','address3','address4','country', 'postcode']
    // },
    'apostrophe-assets': {
      minify: false
      //   ,
      //   scene : "user"

    } 

  }
})
