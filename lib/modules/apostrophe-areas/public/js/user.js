
apos.define('apostrophe-areas', {

  construct: function (self, options) {
    async function sleep() {
      return new Promise((resolve) => setTimeout(resolve, 30));
    }
    async function layoutControls(controls) {
      sleep(300);
      //let colors = [];
      let lastNum = 10000000;
      function generateUniqueHexColor() {
        lastNum += 16725;
        const color = "#" + lastNum.toString(16);
        return color;
      }

      // debugger
      if (controls == undefined) { controls = $('body').find('.apos-area-widget-controls') }
      for (let i = 0; i < controls.length; i++) {
        if (controls[i]) {

             controls[i].style.transformOrigin = "top left";
        }
      }
      // function compare(a, b) {
      //   const aRect = a.getBoundingClientRect();
      //   const bRect = b.getBoundingClientRect();

      //   if (aRect.right === bRect.right && aRect.top === bRect.top) {
      //     return 1;
      //   } else if (aRect.top === bRect.top && aRect.right > bRect.left) {
      //     return 1;
      //   } else {
      //     return (bRect.right + bRect.top) - (aRect.right + aRect.top);
      //   }
      // }
      function compare(a, b) {
        if (a === b) {
          return 0;
        }

        const aParents = getParents(a);
        const bParents = getParents(b);
        const aDepth = aParents.length;
        const bDepth = bParents.length;
        const minDepth = Math.min(aDepth, bDepth);

        for (let i = minDepth - 1; i >= 0; i--) {
          if (aParents[i] !== bParents[i]) {
            return bParents[i].compareDocumentPosition(aParents[i]) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
          }
        }

        return aDepth - bDepth;
      }

      function getParents(element) {
        const parents = [];

        while (element.parentNode) {
          parents.unshift(element.parentNode);
          element = element.parentNode;
        }

        return parents;
      }

      //var controls;
      //controls = $('body').find('.apos-area-widget-controls');
      textboxes = $('body').find('.apos-rich-text-widget-wrapper');
      controls.sort(compare);

      var first = controls[0];
      var left = -50;
      var rotate = 8;
      const allowedOverlapPercentage = 0.70;
      maxtry = 10;

      for (var i = 1; i < controls.length; i++) {
        try {
          left = -50;
          if (controls[i]) {
            //  controls[i].style.transformOrigin = "top left";
            // superEnhanceControlsHover();
            await sleep();
            let col = generateUniqueHexColor();
            mouseoverEnhance($(controls[i].parentElement.parentElement), col);
            mouseleaveEnhance($(controls[i].parentElement.parentElement));
            mouseoverEnhance($(controls[i]), col);
            mouseleaveEnhance($(controls[i]));

            let itry = 0;

            while (overlapPercent(first, controls[i]) > allowedOverlapPercentage && itry <= maxtry && i != 0) {
             // console.log(overlapPercent(first, controls[i]), i)

              first.style.transform = "translate(" + left + "px, -15%) rotate(" + rotate + "deg)";
              await sleep();
              left = left - 30;
              itry++;
            }

            first = controls[i];
            left = -50;
          }
          for (var j = 0; j < textboxes.length; j++) {
            if (intersect(textboxes[j], controls[i + 1]) && controls[i].getBoundingClientRect().width > 100) {
              controls[i].style.transform = "translate(" + left + "%, 30%) rotate(" + rotate + "deg)";
            }
          }


        }
        catch (e) {
          console.log("exit layout controls loop with error " + e); //break; 
        }

      }
      return null;

    }

    function intersect(a, b) {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();

      return (
        aRect.left < bRect.right &&
        bRect.left < aRect.right &&
        aRect.top < bRect.bottom &&
        bRect.top < aRect.bottom
      );
    }

    function overlapPercent(a, b) {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();

      const overlapWidth = Math.max(0, Math.min(aRect.right, bRect.right) - Math.max(aRect.left, bRect.left));
      const totalWidth = Math.max(aRect.right, bRect.right) - Math.min(aRect.left, bRect.left);

      return overlapWidth / totalWidth;
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
        $el.css("outline", "5px solid " + color);
        $el.css("outline-offset", "5px");
        layoutControls($el);
      });
    }

    function mouseleaveEnhance($el) {
      $el.on('mouseout', function (e) {
        $el.css("outline", "none");
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