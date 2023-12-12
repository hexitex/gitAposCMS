module.exports = {    
   name : 'barbajs',
   alias : 'barba',
    afterConstruct : function(self){
       self.addRoutes();
    },
    construct: function(self, options) {        
       // Might going to use this for PJAX Route
       // https://github.com/estrattonbailey/operator
         self.pageServe = function(req , callback){
          // Express Routes
          console.log("Express Routes : ",req.url);
          /**
           * Get Pages Routes & Info
           * TODO :
           * Make a PJAX Route and fetch tree pages to be inserted into
           * Express Routes that can be enable via that NPM module.
           * 
           * NOTE :
           * You can fetch and make your own tree by fetching object property
           * called `level` (Number). Top level page tree such as homepage indicate as level : 0. The rest could be level : 1 , 2 or etc.
           * 
           * There is also have `rank` property which indicates as position increment . It start from 1
           */
          var cursor = self.apos.modules["apostrophe-pages"].find(req)
          .toArray();
 
          cursor.then((data)=>{
             // console.log("Pages Data :" , data)
          }).catch((e)=> callback(e));
 
          // INVOKE to execute again
          self.addRoutes();
 
          self.myReq = req;
 
          // URL of the best matching page available
          // console.log("Data On Page : \n" ,(req.data.page || req.data.bestPage));
          return callback(null);
         }
 
          self.addRoutes = function(){
             var _this = self;
             self.route('get', 'get-apos', function (req, res) {
                return res.send({
                   data: _this.getOption(self.myReq, "apos.push").getBrowserCalls("always")
                });
             });
          }
    }        
 };