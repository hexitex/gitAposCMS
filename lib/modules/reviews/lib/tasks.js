const _ = require("lodash");
module.exports = function(self,options){
     self.addTask('mergeReviewTitle' , 'This is for running review title. \n' +
    'Run this because last time I did \'Reader Name\' added to title name. So , I need to avoid that by migration database.',
    (apos,argv , callback) =>{
        return apos.migrations.eachDoc({
            type : 'reviews'
        },(review , callback)=>{
            if ((review.title).match(/((?:[^\-\s])[\s\w]*)$/i) !== null){
                console.log("Merge On", review.title);
                review.title = (review.title).match(/((?:[^\-\s])[\s\w]*)$/i)[0];
                return apos.docs.db.update({
                    _id : review._id
                },{
                    $set : {
                        title : review.title
                    }
                }, callback);
            }else{
                console.log("Nothing to merge on : ", review.title);
                return setImmediate(callback);
            }
        } , callback);
    })

    /**
     * Running Migrations Method
     * @param {Object} apos 
     * @param {Object} data 
     * @param {Array} id - is fetch via node command like `--readerName=Name` , it will get ["readerName"] value so that I can use validation if matches to eachDoc objects
     * @param {Function} callback 
     */
    self.runMigrations = function (apos, data, id, callback) {
        return apos.migrations.eachDoc({
            type: "reviews"
        }, (review, callback) => {
            var dataFilter = _.pick(data, id)
            var reviewFilter = _.pick(review, ["readerName" , "reviews" ,"ratings", "productId"]);
            var displayLog = _.pick(review, ["title","readerName" , "reviews" ,"ratings", "productId"]);
            // Running Deep Validation
            var validate = _.reduce(dataFilter, function (result, value, key) {
                return _.isEqual(value, reviewFilter[key]) ?
                    true : false;
            }, {});
            // Run if matches
            if (validate) {
                debugger;
                console.log("\n\nSuccessfully Removed : \n", JSON.stringify(displayLog, undefined, 2));
                return apos.docs.db.remove(reviewFilter,callback);
            } else {
                // If not , pass by only
                return setImmediate(callback);
            }
        }, callback);
    }

    self.getCursor = function (apos, req) {
        return apos.docs.find(req, {
            type: "reviews"
        }).toArray();
    }

    self.addTask('delete', "Run this command if you wish to delete some of the reviews information \n" +
        "permanently from your database. Example command : \n\n" +
        "node app reviews:delete --key=\"value\" \n\n" +
        "By that command above , the arguments will be received as object like this below : \n\n" +
        "{ test : 'test'} \n\n" +
        "Accepted keys : \n" +
        "readerName \nreviews \nproductId \n\n" +
        "(P/s : If matches , delete the review. Also can accept multiple keys. Example : \n\n)" +
        "node app reviews:delete --key=\"value\" --anotherKey=\"value\"",
        (apos, argv, callback) => {
            var req = self.apos.tasks.getReq();
            var cursor = self.getCursor(apos, req);
            var filterAll = _.pick(argv , ["readerName" , "productId" , "reviews","ratings"]);
            if(filterAll){
                cursor.then((data) => {
                    if (argv.reviews) {
                        var foundAll = _.find(data, filterAll);
                        var reviews = _.find(data, function (key) {
                            var newRegex = new RegExp(`${argv.reviews}`, "i");
                            return (newRegex).test(key.reviews);
                        });
                        if (reviews && foundAll) {
                            return self.runMigrations(apos, foundAll, Object.keys(filterAll), callback);
                        } else {
                            return setImmediate(_.partial(callback, "\n\nThis Arguments not found : \n\n" + JSON.stringify(filterAll, undefined, 2)));
                        }
                    } else {
                        var foundAll = _.find(data, filterAll);
                        if (foundAll) {
                            return self.runMigrations(apos, foundAll, Object.keys(filterAll), callback);
                        } else {
                            return setImmediate(_.partial(callback, "\n\nThis Arguments not found : \n\n" + JSON.stringify(filterAll, undefined, 2)));
                        }
                    }
                }).catch((e) => console.log(e));
            }else{
                return callback("\n\nERROR : \nYou did not set any arguments object as per \"--key=value\" so that I can do the job if it matches any of the document available.\n\n Example :\n\n node app reviews:delete --readerName=\"Abu Bakar\"")
            }
        });
}