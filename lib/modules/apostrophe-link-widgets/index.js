module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Link',
  beforeConstruct: (self, options) => {
    options.addFields = [
      {
        name: 'linkText',
        label: 'Link Text',
        type: 'string',
        // required: true
      },
      {
        name: 'linkDescription',
        label: 'Link Description',
        type: 'string',
        textarea: true
      },
      {
        name: 'textAlign',
        label: 'Text Alignment',
        type: 'select', def: 'center',
        choices: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }]
      },
      {
        name: 'useImage',
        label: 'Use Image or Button',
        type: 'select',
        required: true,
        choices: [
          {
            label: 'Use Button',
            value: 'button',

          },
          {
            label: 'Use Image',
            value: 'image',

          }]
      },
      {
        name: 'linkImage', label: 'Link Image', type: 'singleton', widgetType: 'apostrophe-images',
        options: { limit: 1, crop: true, focalPoint: true }
      },
      {
        name: 'coverOrContain',
        label: 'Image Covers or Contains Image as Icon for Button?',
        type: 'select', def: 'cover',
        choices: [{ label: 'cover', value: 'cover' }, { label: 'contain', value: 'contain' }]
      },
      {
        name: 'imageSize', label: 'Image size to get from server', help: 'Use the focal point on the image to make sure you get what you need from the image (eye icon)',
        type: 'select', def: 'one-third',
        choices: [{ label: '16 x 16 px', value: '16' }, { label: '32 x 32 px', value: '32' }, { label: '64 x 64 px', value: '64' },
        { label: 'Scaled - One sixth of orig image', value: 'one-sixth' }, { label: 'Scaled - One third of orig image', value: 'one-third' },
        { label: 'Scaled - Two thirds of orig image', value: 'two-thirds' }, { label: 'Scaled - Half orig image', value: 'half' },
        { label: '350 x 350 px', value: '350' }, { label: '1920 X 400 px', value: '1920-400' },
        { label: '1280 X 400 px', value: '1280-400' }, { label: '600 X 600 px', value: '600' },
        { label: '720p', value: '720p' }, { label: '1080p', value: '1080p' },
        { label: '300 X 600 px', value: '300-600' }, { label: '600 X 300 px', value: '600-300' }, { label: 'Full!', value: 'full' }
        ]
      },
      {
        name: 'displayedWidth',
        label: 'Displayed Image Width',
        def: '64px',
        type: 'string'
      },
      {
        name: 'displayedHeight',
        label: 'Displayed Image Height',
        def: '64px',
        type: 'string'
      },
      {
        name: 'linkType',
        label: 'Link Type',
        type: 'select',
        required: true,
        choices: [
          {
            label: 'Page',
            value: 'page',
            showFields: [
              '_linkPage'
            ]
          },
          {
            label: 'Article',
            value: 'blog',
            showFields: [
              '_blog'
            ]
          },
          {
            label: 'File',
            value: 'file',
            showFields: [
              '_linkFile'
            ]
          },
          {
            label: 'Custom',
            value: 'custom',
            showFields: [
              'linkUrl'
            ]
          }
        ]
      },
      {
        name: '_linkPage',
        label: 'Link Page',
        type: 'joinByOne',
        withType: 'apostrophe-page',
        idField: 'pageId',
        required: true,
        filters: {
          projection: {
            title: 1,
            slug: 1,
            type: 1,
            tags: 1
          }
        }
      },
      {
        name: '_blog',
        label: 'Link Article',
        type: 'joinByOne',
        withType: 'blog',
        idField: 'blogId',
        required: true,
        filters: {
          projection: {
            title: 1,
            slug: 1,
            type: 1,
            tags: 1
          }
        }
      },
      {
        name: '_linkFile',
        label: 'Link File',
        type: 'joinByOne',
        withType: 'apostrophe-file',
        idField: 'fileId',
        required: true,
        projection: {
          title: 1,
          slug: 1,
          type: 1,
          tags: 1
        }
      },
      {
        name: 'linkUrl',
        label: 'Link URL',
        type: 'url',
        required: true
      },
      {
        name: 'linkTarget',
        label: 'Will the link open a new browser tab?',
        type: 'boolean'
      },
      {
        name: 'linkTitle',
        label: 'Hover Title',
        type: 'string'
      }
    ].concat(options.addFields || []);
  }
};
