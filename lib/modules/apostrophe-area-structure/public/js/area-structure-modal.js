// apos.define('area-structure-modal', {
  apos.define('area-structure-modal', {
  extend: 'apostrophe-modal',
  source: 'area-structure-modal',
  //extend: 'apostrophe-widgets',

  construct: function(self, options) {
    self.beforeShow = function(callback) {
      $('apos-modal-blackout').css("opacity:0");
      self.$el.find('[data-apos-area-structure-delete]').on('click', function() {
        if (!confirm("Are you sure you want to delete this widget? You can undo with Versions")) {
          return;
        }
        var $this = $(this);
        self.api('area-structure-delete', {
          widgetId: $this.attr('data-apos-widget-id'),
          docId: $this.attr('data-apos-doc-id'),
          dotPath: $this.attr('data-apos-widget-dot-path')
        }, function(response) {
          if (response.status === 'okay') {
            apos.notify('Widget deleted');
            if ($this.parent().siblings().length === 0) {
              $this.parent().parent().fadeOut();
            } else {
              $this.parent().fadeOut();
            }
          } else {
            apos.notify('Something went wrong', { type: 'error' });
            console.log(response.error);
          }
        })
      })
      self.$el.find('[data-apos-area-structure-edit], [data-apos-area-structure-delete]').each(function(){$( this ).on('mouseover', function() {
       // var selector = '[data-apos-area-edit] .apos-area-widget[data-apos-widget-id="' + $(this).attr('data-apos-widget-id') + '"]:first';
      // debugger
        var selector = '.apos-area-widget[data-apos-widget-id="' + $(this).attr('data-apos-widget-id') + '"]:first';
        var $widget = $(selector);
          $widget.mouseover();
         self.$el[0].style.opacity="0.5";
         document.getElementsByClassName('apos-modal-blackout')[0].style.opacity="0";
         setTimeout(function() {
          $widget.scrollintoview();
        }, 500);
      });});


      self.$el.find('[data-apos-area-structure-edit], [data-apos-area-structure-delete]').each(function(){$( this ).on('mouseleave', function() {
        var selector = '.apos-area-widget[data-apos-widget-id="' + $(this).attr('data-apos-widget-id') + '"]:first';
        var $widget = $(selector);
          $widget.mouseleave();
         self.$el[0].style.opacity="1";
         document.getElementsByClassName('apos-modal-blackout')[0].style.opacity="1";
        
      })});

      self.$el.find('[data-apos-area-structure-edit]').on('click', function() {
        var selector = '[data-apos-area-edit] .apos-area-widget[data-apos-widget-id="' + $(this).attr('data-apos-widget-id') + '"]:first';
        var $widget = $(selector);
        var $controls = $widget.find('[data-apos-widget-controls]:first');
        var $editButton = $controls.find('[data-apos-edit-item]:first');
        if ($editButton.length) {
          $editButton.click();
        } else {
          var $richText = $(selector + ' [data-rich-text]:first');
          if ($richText.length) {
            $richText.click();
          }
        }
        self.hide();
        setTimeout(function() {
          $widget.scrollintoview();
        }, 500);
      });
      return setImmediate(callback);
    }
  }
});

