CKEDITOR.dialog.add('contentGenDialog', function (editor) {
    let engine='curie';
    let what='Description'
    let prompt=''
    let temp='Preset'
    return {

        // Basic properties of the dialog window: title, minimum size.
        title: 'Content Gen Properties',
        minWidth: 400,
        minHeight: 200,

        // Dialog window content definition.
        contents: [
            {
                // Definition of the Basic Settings dialog tab (page).
                id: 'tab',
                label: 'Settings',

                // The tab content.
                elements: [
                    {

                        type: 'select',
                        id: 'what',
                        label: 'What type of copy do you want?',
                        items: [['Headline'], ['Summary'], ['Description'], ['Advert'],['Gramma Correction'],['Outline']],
                        'default': 'Description',
                        onChange: function( api ) {
                          //  this = CKEDITOR.ui.dialog.select
                            what=this.getValue();
                        }
                    },
                    {

                        type: 'select',
                        id: 'temp',
                        label: 'AI Creativity (0.0 = more factial > 1.0 = highly suspect)',
                        items: [['Preset'],['0.0'], ['0.1'], ['0.2'], ['0.3'], ['0.4'],['0.5'],['0.6'],['0.7'],['0.8'],['0.9'],['1.0']],
                        'default': 'Preset',
                        onChange: function( api ) {
                          //  this = CKEDITOR.ui.dialog.select
                            temp=this.getValue();
                        }
                    },
                    {
                        // Text input field for the prompt text.
                        type: 'text',
                        id: 'prompt',
                        label: 'Enter some Keywords or Context for the AI to understand',

                        // Validation checking whether the field is not empty.
                        validate: CKEDITOR.dialog.validate.notEmpty("Promt field cannot be empty."),
                        onChange: function( api ) {
                          //  this = CKEDITOR.ui.dialog.text
                            prompt=this.getValue();
                        }
                    },
                    {
                        // Text input field for the abbreviation title (explanation).
                        type: 'textarea',
                        id: 'content',
                        label: 'AI Generated Content - leave empty',
                        //validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." )
                    }, {

                        type: 'select',
                        id: 'engine',
                        label: 'Select the Engine to Use, Davinci is the best but also costs the most, Curie is very good and costs much less, Babbage and Ada are for simple things',
                        items: [['ada'], ['babbage'], ['curie'], ['davinci']],
                        'default': 'curie',
                        onChange: function( api ) {
                      //      this = CKEDITOR.ui.dialog.select
                          engine=this.getValue();
                        }
                    }, {
                        type: 'button',
                        id: 'generate',
                        label: 'Generate',
                        title: 'Generate AI powered content',
                        onClick: function () {
                          //  const editor1=this.editor;
                          //   dialogObj = CKEDITOR.ui.dialog;
                            // alert( 'Clicked: ' + this.id );
                            
                            CKEDITOR.ajax.post('/openai/lookup', JSON.stringify(
                                { 
                                    engine: engine,
                                    prompt:prompt,
                                    what:what,
                                    temp:temp
                                }), 'application/json', function (data) {
                                   
                                    console.log(data);
                                    let mydata=JSON.parse(data);
                                   //dialogObj.setValueOf('tab','content',data );
                                   CKEDITOR.dialog.getCurrent().setValueOf( 'tab', 'content',mydata.content);
                                   // CKEDITOR.dialog.definition.contents.content = data;
                                });
                        }
                    }
                ]
            }

        ],

        // This method is invoked once a user clicks the OK button, confirming the dialog.
        onOk: function () {

            // The context of this function is the dialog object itself.
            // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_dialog.html
            var dialog = this;

            //var array = [];
            var lines = dialog.getValueOf('tab', 'content').split('\n');
            for (var i = 0; i < lines.length; i++) {
                var genText = editor.document.createElement('p');
                genText.setText(lines[i]);
                editor.insertElement(genText);
              //array.push(createArrayItem(lines[i]));
            }


            // Create a new <p> element.
            // var genText = editor.document.createElement('p');

            // // Set element attribute and text by getting the defined field values.
            // //genText.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'prompt' ) );
            // genText.setText(dialog.getValueOf('tab', 'content'));

            // // // Now get yet another field value from the Advanced Settings tab.
            // // var id = dialog.getValueOf( 'tab-adv', 'id' );
            // // if ( id )
            // // genText.setAttribute( 'id', id );

            // // Finally, insert the element into the editor at the caret position.
            // editor.insertElement(genText);
        }
    };
});
