// in lib/modules/likes/public/js/manager-modal.js
apos.define('apostrophe-pieces-manager-modal', {
    construct: function (self, options) {
        console.log("Running Manager Modal");
        // calling from batchOperations {name : 'delete'} to self.batchDelete
        self.batchDelete = function () {
            return self.batchSimple(
                'delete',
                "Are you sure you want to delete " + self.choices.length + " items?", {}
            );
        };
    }
});