module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Email Signup Section',
    skipInitialModal: true,
    editLabel : 'Edit Email Signup Section',
    addFields: [{
        name: 'emailSignupArea',
        type: 'area',
        label: 'Email Signup Area',
        contextual : true
    }],
    beforeConstruct: function (self, options) {
        options.addFields = [
            // {
        //     name: 'emailSignupTitle',
        //     type: 'string',
        //     label: 'Email Signup Title',
        //     def: 'EmailSignup'
        // }, {
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
        // }, {
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
        // }, 
        {
            name: 'category',
            label: 'Category for signup',
            type: 'string'
        }].concat(options.addFields || []);
    },
    construct: function (self, options) {
        var superPushAssets = self.pushAssets;

        self.pushAssets = function () {
            superPushAssets();

            self.pushAsset('stylesheet', 'emailSignupSection', {
                when: 'always'
            })
        }
    }
};