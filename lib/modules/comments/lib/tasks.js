const _ = require("lodash");
module.exports = function(self,options){
    // To be continue tomorrow. Here is the data to study. We are going to change comment title because we have
    // new column in our manage modal
    // Run `node app comments:mergeCommentTitle`
    self.addTask('mergeCommentTitle' , 'This is for running comment title. \n' +
    'Run this because last time I did \'Reader Name\' added to title name. So , I need to avoid that by migration database.',
    (apos,argv , callback) =>{
        return apos.migrations.eachDoc({
            type : 'comments'
        },(comment , callback)=>{
            if ((comment.title).match(/((?:[^\-\s])[\s\w]*)$/i) !== null){
                console.log("Merge On", comment.title);
                comment.title = (comment.title).match(/((?:[^\-\s])[\s\w]*)$/i)[0];
                return apos.docs.db.update({
                    _id : comment._id
                },{
                    $set : {
                        title : comment.title
                    }
                }, callback);
            }else{
                console.log("Nothing to merge on : ", comment.title);
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
            type: "comments"
        }, (comment, callback) => {
            var dataFilter = _.pick(data, id)
            var commentFilter = _.pick(comment, ["readerName" , "comments" , "postId"]);
            var displayLog = _.pick(comment, ["title","readerName" , "comments" , "postId"]);
            // Running Deep Validation
            var validate = _.reduce(dataFilter, function (result, value, key) {
                return _.isEqual(value, commentFilter[key]) ?
                    true : false;
            }, {});
            // Run if matches
            if (validate) {
                debugger;
                console.log("\n\nSuccessfully Removed : \n", JSON.stringify(displayLog, undefined, 2));
                return apos.docs.db.remove(commentFilter,callback);
            } else {
                // If not , pass by only
                return setImmediate(callback);
            }
        }, callback);
    }

    self.getCursor = function (apos, req) {
        return apos.docs.find(req, {
            type: "comments"
        }).toArray();
    }

    self.addTask('delete', "Run this command if you wish to delete some of the comments information \n" +
        "permanently from your database. Example command : \n\n" +
        "node app comments:delete --key=\"value\" \n\n" +
        "By that command above , the arguments will be received as object like this below : \n\n" +
        "{ test : 'test'} \n\n" +
        "Accepted keys : \n" +
        "readerName \ncomments \npostId \n\n" +
        "(P/s : If matches , delete the comments. Also can accept multiple keys. Example : \n\n)" +
        "node app comments:delete --key=\"value\" --anotherKey=\"value\"",
        (apos, argv, callback) => {
            var req = self.apos.tasks.getReq();
            var cursor = self.getCursor(apos, req);
            var filterAll = _.pick(argv , ["readerName" , "postId" , "comments"]);
            if(filterAll){
                cursor.then((data) => {
                    if (argv.comments) {
                        var foundAll = _.find(data, filterAll);
                        var comments = _.find(data, function (key) {
                            var newRegex = new RegExp(`${argv.comments}`, "i");
                            return (newRegex).test(key.comments);
                        });
                        if (comments && foundAll) {
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
                return callback("\n\nERROR : \nYou did not set any arguments object as per \"--key=value\" so that I can do the job if it matches any of the document available.\n\n Example :\n\n node app comments:delete --readerName=\"Abu Bakar\"")
            }
        });
}