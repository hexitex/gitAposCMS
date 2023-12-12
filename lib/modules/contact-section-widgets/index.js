module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Contact Section',
    skipInitialModal: true,
    editLabel : 'Edit Contact Section',
    addFields: [{
        name: 'contactArea',
        type: 'area',
        label: 'Contact Area',
        contextual : true
    }],
    beforeConstruct: function (self, options) {
        options.addFields = [{
            name: 'contactTitle',
            type: 'string',
            label: 'Contact Title',
            def: 'Contact'
        }
        // , 
        // {
        //     name: 'linkImage',
        //     label: 'Link/Source Image',
        //     type: 'select',
        //     choices: [{
        //             label: 'Source Image',
        //             value: 'source-image',
        //             showFields: ['thumbnailSection']
        //         },
        //         {
        //             label: 'Link Image',
        //             value: 'link-image',
        //             showFields: ['linkThumbnailSection']
        //         }
        //     ]
        // }, 
        // {
        //     name: 'thumbnailSection',
        //     type: 'singleton',
        //     help: 'GIF Supported',
        //     widgetType: 'apostrophe-images',
        //     options: {
        //         aspectRatio: [683, 769],
        //         limit: 1,
        //         focalPoint: true,
        //         noHeight: true,
        //         extensions: ['jpg', 'gif']
        //     }
        // }, {
        //     name: 'linkThumbnailSection',
        //     label: 'Paste Your Link Here',
        //     type: 'string'
        // }
    ].concat(options.addFields || []);
    },
    construct: function (self, options) {
        var superPushAssets = self.pushAssets;

        self.pushAssets = function () {
            superPushAssets();

            self.pushAsset('stylesheet', 'contactSection', {
                when: 'always'
            })
        }
    }
};