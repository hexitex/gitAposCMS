var async = require('async');
module.exports = function(self,options){
    // Add Permanent Delete
    var superRoutes = self.createRoutes;
    self.createRoutes = function () {
        console.log("Running Routes");
        self.route('post', 'delete', self.routes.deletePermanent);
        superRoutes();
    };
    var superApiResponse = self.apiResponse;
    self.deleteResponse = function (req, res, err, data) {
        return superApiResponse(res, err, data);
    };
    self.routes.deletePermanent = function (req, res) {
        console.log("Running Permanent");
        return self.batchSimpleRoute(req, 'delete', function (req, piece, data, callback) {
            var ids;
            if (req.body.job) {
                // New way
                return self.apos.modules['apostrophe-jobs'].run(req, function (req, id, callback) {
                    return one(id, callback);
                }, {
                    label: {
                        title: 'Delete'
                    }
                });
            }

            // bc and single id case

            if (Array.isArray(req.body.ids)) {
                ids = self.apos.launder.ids(req.body.ids);
            } else {
                ids = [self.apos.launder.id(req.body._id)];
            }

            return async.eachSeries(ids, one, function (err) {
                return self.deleteResponse(req, res, err, {});
            });

            function one(id, callback) {
                return async.series({
                    delete: function (callback) {
                        return self.deleteFromTrash(req, id, callback);
                    }
                }, function (err) {
                    return callback(err);
                })
            }
        });
    };
}