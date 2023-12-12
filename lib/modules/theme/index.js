module.exports = {
  construct: function(self, options) {
  
    // loads from public/css/site.less of this module
    self.pushAsset('stylesheet', 'site');
  }
};
