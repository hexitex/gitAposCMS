module.exports = {
  construct: function (self, options) {
    self.addFilter('subcategory', {
      def: false,
      launder: function (value) {
        return self.apos.launder.string(value);
      },
      safeFor: 'public',
      finalize: function (callback) {
        var slug = self.get('ecomsubcategories');
        // console.log('ecomsubcategories ' +self.get('req'))
        if (!slug) {
          return setImmediate(callback);
        }
        // console.log('ecomsubcategories 2')
        // Get the request object to pass to `find`
        var req = self.get('req');
        return self.apos.docs.getManager('ecom-subcategory').find(req, {
          slug: slug
        }, {
          _id: 1
        }).toObject(function (err, ecomsubcategory) {
          if (err) {
            return callback(err);
          }
          self.and({ ecomsubcategoryId: ecomsubcategory._id });
          return callback(null);
        });
      }
    });
  //   self.addFilter('category', {
  //     def: false,
  //     launder: function (value) {
  //       return self.apos.launder.string(value);
  //     },
  //     safeFor: 'public',
  //     finalize: function (callback) {
  //       var slug = self.get('ncccategories');
  //       console.log('ncccategories')
  //       if (!slug) {
  //         return setImmediate(callback);
  //       }
  //       console.log('ncccategories 2')
  //       var subcat = self.get('nccsubcategories');
  //       if (subcat) {
  //         return setImmediate(callback);
  //       }
  //       console.log('ncccategories 3')
  //       // Get the request object to pass to `find`
  //       var req = self.get('req');
  //       return self.apos.docs.getManager('ncc-subcategory').find(req, {
  //         ncccategory: slug
  //       }, {
  //         _id: 1
  //       }).toObject(function (err, ncccategory) {
  //         if (err) {
  //           return callback(err);
  //         }
  //         self.and({ ncccategory: nccsubcategory });
  //         return callback(null);
  //       });
  //     }
  //   });
   }
};
