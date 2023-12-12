// in lib/modules/apostrophe-rich-text-widgets/public/js/editor.js in your project folder
apos.define('apostrophe-rich-text-widgets-editor', {
    construct: function (self, options) {
        self.beforeCkeditorInline = function () {
           
            self.config.extraPlugins = 'font,ckawesome,contentGen,xml,ajax';
            self.config.contentsCss = 'https://use.fontawesome.com/releases/v5.7.2/css/all.css';
           // self.config.allowedContent = true; 
            self.config.toolbar = [{ name: 'CKAwesome', items: ['Image', 'ckawesome','Content Gen']}];

            /**
             * The list of fonts size to be displayed in the Font Size combo in the
             * toolbar. Entries are separated by semi-colons (`';'`).
             *
             * Any kind of "CSS like" size can be used, like `'12px'`, `'2.3em'`, `'130%'`,
             * `'larger'` or `'x-small'`.
             *
             * A display name may be optionally defined by prefixing the entries with the
             * name and the slash character. For example, `'Bigger Font/14px'` will be
             * displayed as `'Bigger Font'` in the list, but will be outputted as `'14px'`.
             *
             *		config.fontSize_sizes = '16/16px;24/24px;48/48px;';
             *
             *		config.fontSize_sizes = '12px;2.3em;130%;larger;x-small';
             *
             *		config.fontSize_sizes = '12 Pixels/12px;Big/2.3em;30 Percent More/130%;Bigger/larger;Very Small/x-small';
             *
             * @cfg {String} [fontSize_sizes=see source]
             * @member CKEDITOR.config
             */
          //  self.config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;80/80px';
            self.config.allowedContent = true;
            self.config.extraAllowedContent = '(*)';
            self.config.removeEmpty = false;
            // Must Initialize Toolbar for Font
            // Flexible auto initialize plugin if font available in toolbar options
            switch (true) {
                case (_.includes(self.options.toolbar , "font")):
                    self.config.toolbar = 'font';                   
                    break;
            }
            self.config.skin = 'moono-lisa';
            self.config.uiColor = '#FFFFFF'; 

            // Custom Toolbar Group Arrangement
            // You can try here : https://ckeditor.com/latest/samples/toolbarconfigurator/index.html#basic
            self.config.toolbarGroups = [
                { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                { name: 'forms', groups: [ 'forms' ] },
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                { name: 'links', groups: [ 'links' ] },
                { name: 'insert', groups: [ 'insert' ] },
                '/',
                { name: 'styles', groups: [ 'styles' ] },
                { name: 'colors', groups: [ 'colors' ] },
                { name: 'tools', groups: [ 'tools' ] },
                { name: 'others', groups: [ 'others' ] },
                { name: 'about', groups: [ 'about' ] }
            ];

            self.config.removeButtons = 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,BidiLtr,BidiRtl,Language,Image,Flash,Smiley,PageBreak,Iframe,Format,Font,FontSize,Maximize,ShowBlocks,About';
        };
    }
});