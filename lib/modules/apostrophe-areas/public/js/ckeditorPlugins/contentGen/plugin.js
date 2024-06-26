CKEDITOR.plugins.add( 'contentGen', {
    icons: 'brain',
   
	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define an editor command that opens our dialog window.
		editor.addCommand( 'contentGen', new CKEDITOR.dialogCommand( 'contentGenDialog' ) );

		// Create a toolbar button that executes the above command.
		editor.ui.addButton( 'Brain', {

			// The text part of the button (if available) and the tooltip.
			label: 'Generate Content',

			// The command to execute on click.
			command: 'contentGen',

			// The button placement in the toolbar (toolbar group name).
			toolbar: 'insert'
		});

		// Register our dialog file -- this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'contentGenDialog', this.path + 'dialogs/contentGenDialog.js' );
	}
});




// /**
//  *   CKAwesome 
//  *   =========
//  *   http://blackdevelop.com/io/ckawesome/
//  *   
//  *   Copyright (C) 2017 by Blackdevelop.com
//  *   Licence under GNU GPL v3.
//  */

//  CKEDITOR.on('instanceReady',function () { CKEDITOR.document.appendStyleSheet(CKEDITOR.plugins.getPath('ckawesome') + 'resources/select2/select2.full.min.css');   });
//  CKEDITOR.on('instanceReady',function () { CKEDITOR.document.appendStyleSheet(CKEDITOR.plugins.getPath('ckawesome') + 'dialogs/ckawesome.css');   });
//  CKEDITOR.scriptLoader.load(CKEDITOR.plugins.getPath('ckawesome') + 'resources/select2/select2.full.min.js');
//  CKEDITOR.dtd.$removeEmpty.span = 0;
//  CKEDITOR.plugins.add('ckawesome', {
//      requires: 'colordialog',
//      icons: 'ckawesome',
     
//      init: function(editor) {
//          var config = editor.config;
//          editor.fontawesomePath = config.fontawesomePath ? config.fontawesomePath : CKEDITOR.plugins.getPath('ckawesome') + 'fontawesome/css/font-awesome.min.css';
 
//          CKEDITOR.document.appendStyleSheet(editor.fontawesomePath);
//          editor.addContentsCss(editor.fontawesomePath);
         
//          CKEDITOR.dialog.add('ckawesomeDialog', this.path + 'dialogs/ckawesome.js');
//          editor.addCommand( 'ckawesome', new CKEDITOR.dialogCommand( 'ckawesomeDialog', { allowedContent: 'span[class,style]{color,font-size}(*);' }));
//          editor.ui.addButton( 'ckawesome', {
//                label: 'Insert CKAwesome',
//                command: 'ckawesome',
//                toolbar: 'insert',
//          });
//      }
//  });