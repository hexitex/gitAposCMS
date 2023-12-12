const fs = require("fs");
const path = require("path");
module.exports = {
  construct: function (self, options) {

    var pathLib = path.join(__dirname + "/lib");
    fs.readdirSync(pathLib).filter((file)=>{
      require(pathLib + "/" + file)(self,options);
    });

  }
}