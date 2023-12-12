module.exports = {
    extend: 'apostrophe-pieces-pages',
    piecesFilters: [{
      name: 'tags'
    }, {
      name: 'title'
    }],
    perPage: 3,
    construct: function (self, options) {
      var superPushAssets = self.pushAssets
      self.pushAssets = function () {
        superPushAssets()
    
      }
    }
  };