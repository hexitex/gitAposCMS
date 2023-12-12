module.exports = {
  improve: 'apostrophe-global',
  
      addFields: [
        {
          name: 'footerArea',
          label: 'Footer',
          help: 'Add a footer here which will be displayed on all pages',
          type: 'area',
          //contextual:true,
          options:{
            widgets:{'apostrophe-rich-text': {
          toolbar: ['bold', 'italic', 'Link', 'Unlink', 'Anchor', 'Table', 'BulletedList', 'Strike', 'Subscript', 'Superscript', 'font'],
          styles: [
              {   name: 'Default',
                  element: 'p',
                  attributes:{'class': 'normal-text'}
              },
          
              {   name: 'H2',
                  element: 'h2'
              },
              {   name: 'H3',
                  element: 'h3'
              },
              {   name: 'H4',
                  element: 'h4'
              },
              {   name: 'H5',
                  element: 'h5'
              },
                 {   name: 'Invert Colour',
                  element: 'span',
                  attributes: {'class': 'invert-text'}
              },
            
                {   name: 'Add Highlight Colour',
                  element: 'span',
                  attributes: {'class': 'orange-text'}
              },
             {   name: 'Add Black',
                  element: 'span',
                  attributes: {'class': 'black-text'}
              },],
  
             controls: {
              movable: true,
              removable: true,
              position: 'top-right'
          }
      },
  
   'section' : {
      editLabel : 'Edit Smart Section',
      controls : {
          movable : true,
          removable: true,
          position: 'top-right'
      }
  },
 
  
   'one-columns' : {
      
      controls : {
          movable : true,
          removable: true,
          position: 'top-right'
      }
  },
  'two-columns' : {
     
      controls : {
          movable : true,
          removable: true,
          position: 'top-right'
      }
  },
  'three-columns' : {
    
      controls : {
          movable : true,
          removable: true,
          position: 'top-right'
      }
  },
  'apostrophe-images': {

      size: 'full'
  },
  'spacer': {
   
      controls: {
          movable: true,
          removable: true,
          position: 'top-right'
      }
  },
    'apostrophe-link': {
      controls: {
        cloneable: true,
        removable: true,
        position: 'top-right'
      }
    },
},
widgetGroups: {
'Content': [ 'apostrophe-rich-text', 'apostrophe-images','apostrophe-link' ],
'Layout': [ 'one-columns', 'two-columns','three-columns','spacer','section' ]
}
}

       
        },
        {
          type: 'boolean',
          name: 'hideFooter',
          label: 'Hide Footer During Editing Pages',
          def: true
        },
        {
          type: 'string',
          name: 'defaultFromEmailName',
          label: 'Default From Email Name'
        },
        {
          type: 'string',
          name: 'defaultFromEmail',
          label: 'Default email used as from address'
        },
        {
          type:'attachment', 
          name: 'favicon',
          label:'Site Icon',
          group:'image'
        },
        {
          type:'string', 
          name: 'tagline',
          label:'Site Tag-line',
         
        },
        {
          type: 'integer',
          name: 'shopVat',
          label: 'Global VAT/Taxes %'
        },
        {
          type: 'string',
          name: 'paypalClientUrl',
          label: 'Paypal client Id, ex sandbox: https://www.paypal.com/sdk/js?client-id=sb'
        },
        {
          type: 'string',
          name: 'currencyPaypal',
          label: 'Paypal currency (like USD etc)',
          def: 'EUR'
        },
        {
          type: 'select',
          name: 'currency',
          label: 'Currency',
          choices: [
            {
              label: '€',
              value: '€',
            },
            {
              label: '$',
              value: '$'
            },
            {
              label: '£',
              value: '£'
            }
          ],
          def: '€',
          required: true
        },
        {
          type: 'string',
          name: 'receiptHeader',
          label: 'Receipt header'
        },
        {
          type: 'string',
          name: 'organisaton',
          label: 'Organisation Name'
        }
    
      ], arrangeFields: [
        {
          name: 'ECommerce',
          label: 'ECommerce',
          fields: ['organisaton','shopVat','paypalClientUrl','currencyPaypal','currency','receiptHeader','defaultFromEmail','defaultFromEmailName']
      },
  
        {
          name: 'site',
          label: 'Site',
          fields: ['footerArea','favicon','tagline','hideFooter']
        }

      ],
      filters : {
          areas : false,
          projection: {
            title: 1,
            slug: 1,
            tags: 1,
            type: 1
          }
      },
 
     
    }