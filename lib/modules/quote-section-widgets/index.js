module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Quote Section',
    skipInitialModal: true,
    editLabel : 'Edit Quote Section',
    addFields: [{
        name: 'quoteArea',
        type: 'area',
        label: 'Quote Area',
        contextual : true
    }],
    beforeConstruct: function (self, options) {
        options.addFields = [{
            name: 'quoteTitle',
            type: 'string',
            label: 'Quote Title',
            def: 'Quote'
        }
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