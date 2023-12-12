var _ = require('lodash')
module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Reviews Widgets',
  contextualOnly : true,
  scene: 'user',
  projection: {
    type: 1,
    title: 1,
    slug: 1,
    date: 1,
    reviews: 1,
    readerName: 1,
    ratings:1,
    productId: 1
  },
  construct: function (self, options) {
    self.pushAsset('stylesheet', 'reviewsWidget', {
      when: 'always'
    })
    self.pushAsset('script', 'always', {
      when: 'always'
    })
    
    // Get the reviewform piece by calling it
    self.forms = self.apos.reviewForm;

    // Output it to our template , and get it via data.widget.reviews
    self.output = function(widget , options){
      return self.partial(self.template , {
        widget : widget ,
        options : options ,
        manager : self,
        reviews: self.forms.submitSchema
      });
    }

    // Create a route to submit to our piece
    self.route('post' , 'submit',  function(req,res){
      // call our submit method that have .submit(req ,callback) to implement it to our piece
      return self.forms.submit(req , function(err){
        // Send back/Callback to browser if its okay
        return res.send({status : err ? 'error' : 'ok'})
      })
    })

    // Determine the data that get passed on to manager for this widget type
    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    // takes a real req object to pass to singleton
    self.getCreateSingletonOptions = function(req){
      // Subclass the method to extend it
      var options = superGetCreateSingletonOptions(req);
      options.submitSchema = self.forms.submitSchema;
      // Create a new piece with instance
      options.piece = self.forms.newInstance();
      return options;
    }
  }
}
