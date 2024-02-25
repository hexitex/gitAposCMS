const _ = require("lodash");
// const async = require("async");
module.exports = function(self,options){

    self.runMigrations = function (apos ,data , id, callback) {
        return apos.migrations.eachDoc({
            type : "quote-request-form"
        }, (quote , callback)=>{
            var dataFilter = _.pick(data, id);
            var quoteFilter = _.pick(quote, ["personName", "email", "message"]);
            var validate = _.reduce(dataFilter, function (result, value, key) {
                return _.isEqual(value, quoteFilter[key]) ?
                    true : false;
            }, {});
            // Run if matches
            if(validate){
                console.log("\n\nSuccessfully Removed : \n", JSON.stringify(quoteFilter, undefined, 2));
                return apos.docs.db.remove(quoteFilter ,callback);
            }else{
                // If not , pass by only
                return setImmediate(callback);
            }
        } , callback);
    }

    self.getCursor = function(apos , req){
        return apos.docs.find(req , {
            type : "quote-request-form"
        }).toArray();
    }
    
    self.addTask('delete' , "Run this command if you wish to delete some of the contact information \n" +
    "permanently from your database. Example command : \n\n" +
    "node app contact-form:delete --key=\"value\" \n\n" +
    "By that command above , the arguments will be received as object like this below : \n\n" +
    "{ test : 'test'} \n\n" +
    "Accepted keys : \n" +
    "personName \nemail \nmessage \n\n" +
    "(P/s : If matches , delete the contact form)",
    (apos , argv , callback)=>{
        var req = self.apos.tasks.getReq();
        var cursor = self.getCursor(apos, req);
        var filterAll = _.pick(argv, ["personName", "email", "message"]);
        if (filterAll) {
            cursor.then((data) => {
                if (argv.message) {
                    var foundAll = _.find(data, filterAll);
                    var message = _.find(data, function (key) {
                        var newRegex = new RegExp(`${argv.message}`, "i");
                        return (newRegex).test(key.message);
                    });
                    if (message && foundAll) {
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
        } else {
            return callback("\n\nERROR : \nYou did not set any arguments object as per \"--key=value\" so that I can do the job if it matches any of the document available.\n\n Example :\n\n node app comments:delete --readerName=\"Abu Bakar\"")
        }
    });
}