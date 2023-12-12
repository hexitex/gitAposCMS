
apos.define('apostrophe-areas', {

  construct: function (self, options) {
    const colors = [
      "F0F8FF", "7FFFD4", "F0FFFF", "FFE4C4", "FFEBCD", "0000FF", "8A2BE2", "DEB887", "5F9EA0", "7FFF00", "6495ED", "DC143C", "00FFFF",
      "00008B", "008B8B", "B8860B", "006400", "BDB76B", "8B008B", "556B2F", "FF8C00", "9932CC", "8B0000", "E9967A", "8FBC8F", "483D8B", "00CED1", "9400D3", "FF1493",
      "00BFFF", "1E90FF", "B22222", "228B22", "FF00FF", "FFD700", "DAA520", "008000", "ADFF2F", "F0FFF0", "FF69B4", "CD5C5C", "4B0082", "FFFFF0", "F0E68C", "E6E6FA",
      "FFF0F5", "7CFC00", "FFFACD", "ADD8E6", "F08080", "E0FFFF", "FAFAD2", "90EE90", "FFB6C1", "FFA07A", "20B2AA", "87CEFA", "778899", "B0C4DE", "FFFFE0", "00FF00",
      "32CD32", "FAF0E6", "FF00FF", "800000", "66CDAA", "0000CD", "BA55D3", "9370D8", "3CB371", "7B68EE", "00FA9A", "48D1CC", "C71585", "191970", "F5FFFA", "FFE4E1",
      "FFE4B5", "000080", "808000", "6B8E23", "FFA500", "FF4500", "DA70D6", "EEE8AA", "98FB98", "AFEEEE", "D87093", "FFEFD5", "FFDAB9", "CD853F", "FFC0CB", "DDA0DD",
      "B0E0E6", "800080", "663399", "FF0000", "BC8F8F", "4169E1", "8B4513", "FA8072", "F4A460", "2E8B57", "FFF5EE", "A0522D", "C0C0C0", "87CEEB", "6A5ACD", "708090",
      "708090", "00FF7F", "4682B4", "D2B48C", "008080", "D8BFD8", "FF6347", "40E0D0", "EE82EE", "FFFF00", "9ACD32", "00FFFF"
    ];

    function layoutControls(controls) {
      debugger
      if (controls==undefined){controls=$('body').find('.apos-area-widget-controls')}
      function compare(a, b) {
        return $(a).index() - $(b).index();
      }
      //   function compare(a, b) {
      //     if (a.getBoundingClientRect().right === b.getBoundingClientRect().right &&
      //       a.getBoundingClientRect().top === b.getBoundingClientRect().top) { return 1 }
      //     else
      //       if (a.getBoundingClientRect().top === b.getBoundingClientRect().top
      //         && a.getBoundingClientRect().right > b.getBoundingClientRect().left) { return 1 }
      //       else
      //         return (a.getBoundingClientRect().right + a.getBoundingClientRect().top) - (b.getBoundingClientRect().right + b.getBoundingClientRect().top);
      //   }

      //var controls;
      //controls = $('body').find('.apos-area-widget-controls');
      textboxes = $('body').find('.apos-rich-text-widget-wrapper');
      controls.sort(compare);

      var first = controls[0];
      var left = 0;
      var rotate = 10;
      for (var i = 1; i < controls.length; i++) {
        try {
debugger
          if (controls[i]) {
            controls[i].style.transformOrigin = "top left";
            // superEnhanceControlsHover();
            var s = 1;
            if (i < colors.length) { s = i }
            mouseoverEnhance($(controls[i].parentElement.parentElement), colors[s]);
            mouseleaveEnhance($(controls[i].parentElement.parentElement));
            mouseoverEnhance($(controls[i]), colors[s]);
            mouseleaveEnhance($(controls[i]));
            if (intersect(first, controls[i])) {
              left -= 40;
              controls[i].style.transform = "translate(" + left + "%, 0) rotate(" + rotate + "deg)";
            }
            else {
              controls[i].style.transform = "rotate(" + rotate + "deg)";
              first = controls[i];
              var left = 0;
            }
            for (var j = 0; j < textboxes.length; j++) {
              if (intersect(textboxes[j], controls[i]) && controls[i].getBoundingClientRect().width > 100) {
                controls[i].style.transform = "translate(" + left + "%, 30%) rotate(" + rotate + "deg)";
              }
            }

          }
        }
        catch (e) {
          console.log("exit layout controls loop with error " + e); //break; 
        }

      }
      return null;
    }


    // function intersect(elem1, elem2) {
    //   var rect1 = elem1.getBoundingClientRect();
    //   var rect2 = elem2.getBoundingClientRect();
    //   return !(rect1.right < rect2.left ||
    //     rect1.left > rect2.right ||
    //     rect1.bottom < rect2.top ||
    //     rect1.top > rect2.bottom)
    // }

    // function layoutControls() {
    //   function compare(a, b) {
    //     return $(a).index() - $(b).index();
    //   }

    //   var controls = $('.apos-area-widget-controls');
    //   var textboxes = $('.apos-rich-text-widget-wrapper');

    //   controls.sort(compare);

    //   var top = 0;
    //   var left = 0;
    //   for (var i = 0; i < controls.length; i++) {
    //     try {
    //       var control = controls[i];
    //       var controlRect = control.getBoundingClientRect();
    //       control.style.position = "absolute";
    //       control.style.top = top + "px";
    //       control.style.left = left + "px";

    //       for (var j = 0; j < textboxes.length; j++) {
    //         var textbox = textboxes[j];
    //         var textboxRect = textbox.getBoundingClientRect();

    //         if (intersect(textbox, control) && controlRect.width > 100) {
    //           control.style.top = (top + controlRect.height) + "px";
    //         }
    //       }

    //       top = top + controlRect.height;
    //       left = controlRect.right;
    //     } catch (e) {
    //       console.log("Error in layoutControls: " + e);
    //     }
    //   }

    //   return null;
    // }

    // function intersect(elem1, elem2) {
    //   var rect1 = elem1.getBoundingClientRect();
    //   var rect2 = elem2.getBoundingClientRect();

    //   return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    // }
    function intersect(elem1, elem2) {
      var rect1 = elem1.getBoundingClientRect();
      var rect2 = elem2.getBoundingClientRect();

      return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    }
    var superEnableCkeditor = self.enableCkeditor;
    self.enableCkeditor = function () {
      superEnableCkeditor();

      CKEDITOR.plugins.addExternal('font', '/modules/my-apostrophe-areas/js/ckeditorPlugins/font/', 'plugin.js');
      CKEDITOR.plugins.addExternal('ckawesome', '/modules/my-apostrophe-areas/js/ckeditorPlugins/ckawesome/', 'plugin.js');
      CKEDITOR.plugins.addExternal('colordialog', '/modules/my-apostrophe-areas/js/ckeditorPlugins/colordialog/', 'plugin.js');
      CKEDITOR.plugins.addExternal('xml', '/modules/my-apostrophe-areas/js/ckeditorPlugins/xml/', 'plugin.js');
      CKEDITOR.plugins.addExternal('ajax', '/modules/my-apostrophe-areas/js/ckeditorPlugins/ajax/', 'plugin.js');
      CKEDITOR.plugins.addExternal('contentGen', '/modules/my-apostrophe-areas/js/ckeditorPlugins/contentGen/', 'plugin.js');

      CKEDITOR.config.fontawesomePath = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css';

    };
    function mouseoverEnhance($el, color) {
      $el.on('mouseover', function (e) {
        $el.css("box-shadow", "inset 0 0 5px 2px #" + color + ", 0 0 5px 2px #" + color);
layoutControls($el);
      });
    }

    function mouseleaveEnhance($el) {
      $el.on('mouseout', function (e) {
        $el.css("box-shadow", "none");
      });
    }

    apos.on("change", function () {
      if (apos.user)
        layoutControls();

    });
    apos.on("enhance", function (e) {
      if (apos.user) {
        try {
          if (!e[0].classList.contains("apos-model")) {
            setTimeout(function () { layoutControls(), 500 })
          }
        } catch (err) { }
      }
    });
    apos.on("widgetMoved", function () {
      if (apos.user)
        layoutControls();
    });
    apos.on("widgetTrashed", function () {
      if (apos.user)
        layoutControls();
    });
  },
});