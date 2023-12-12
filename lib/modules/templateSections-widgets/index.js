// const fs = require("fs");
// const $ = require("jquery");
const _ = require('lodash');
//const apos = require("apostrophe");

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Section Template',
  alias: 'sectionTemplate',
  defer: true,
  addFields: [
    {
      name: '_nsection',
      type: 'joinByOne',
      withType: 'templateSections',
      label: 'Template',
      required: true,
      idField: 'id',
      filters: {
        projection: {
          title: 1,
          // _url: 1,
          nsection: 1
          // ,
          // newnsection: 1

        }
      }
    }
    ,
    {
      name: 'newnsection',
      type: 'area',
      label: 'Section',
      contextual: true
      //,
      //  def: ''
    }
  ],

  construct: function (self, options) {

    self.addHelpers({
      copyme: function (data) {
     
        if (data.newnsection && data.newnsection.items.length == 0
        ) {
          try {

            data.newnsection.items = data._nsection.nsection.items
            area = recalcDotPathsAreas(data.newnsection);
        
          } catch (w) { console.log(w) }
     
          function recalcDotPathsAreas(area) {
            var docId = area._docId;
            var dotPath = area._dotPath;
            if (area.items && area.items.length !== 0)
              area.items.forEach(stlevel);
            function stlevel(value, index, array) {

              var widgetDotPath = dotPath + '.items.' + index;
              try {
                var $widget = value;
                value.__docId = docId;
                value.__dotPath = widgetDotPath;
                recalcDotPathsAreasWidget(value, docId, widgetDotPath);
              } catch (e) {
                console.log(e)

              };
            }
            return area
          };

          function recalcDotPathsAreasWidget($widget, docId, dotPath) {
            if ($widget.items && $widget.items.length !== 0)
              $widget.items.forEach(sclevel);
            function sclevel(value, index, array) {
              //  var $area = value;
              var areaDocId = value._id;
              if ((areaDocId !== docId) && areaDocId && (areaDocId.substring(0, 1) === 'w')) {
                value._id = docId;
                areaDocId = docId;
              }
              if (areaDocId === docId) {
                var areaDotPath = value._dotPath;
                if (areaDotPath) {
                  var components = areaDotPath.split('.');
                  var name = components.pop();
                  value._dotPath = dotPath + '.' + name;
                  self.recalculateDotPathsInArea(value);
                }
              }
            };
          };
        }
      
        return data;
      }
    });

    var superPushAssets = self.pushAssets
    self.pushAssets = function () {
      superPushAssets()
       self.pushAsset('script', 'always', { when: 'always' })
    }

  }

}