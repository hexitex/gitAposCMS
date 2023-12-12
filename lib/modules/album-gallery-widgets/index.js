module.exports = {

    extend: 'apostrophe-widgets',
    label: 'Coverflow Flipper Gallery',
    beforeConstruct: function (self, options) {
        options.addFields = [{
                name: 'albumName',
                label: 'Album ID',
                type: 'string',
                help: 'This is an internal id. It must be unique for the page (NO SPACES and NO NON ALPHA-NUMERIC)',
                required: true
            },
            {
                name:'width',
                label:'Width in PX VW or %',
                type:'string',
                def:'50vw'
            },
            {
                name:'height',
                label:'Height in PX VH or %',
                type:'string',
                def:'50vh'
            },

            {
                name: 'effect',
                label: 'Type of Effect',
                type: 'select',
                choices: [{
                        label: 'Coverflow',
                        value: 'cover',
                        showFields: ['rotate', 'depth', 'stretch', 'modifier', 'shadows', 'autoplay', 'delay', 'speed','pagination', 'loop']
                    },
                    {
                        label: 'Flip',
                        value: 'flip',
                        showFields: ['autoplay', 'delay', 'speed','shadows', 'limitRotation', 'loop', 'shadows', 'pagination', 'rotate']
                    },
                    {
                        label: 'Fade',
                        value: 'fade',
                        showFields: ['autoplay', 'delay', 'speed','crossfade', 'loop', 'pagination']
                    },
                    {
                        label: 'Cube',
                        value: 'cube',
                        showFields: ['autoplay', 'delay', 'speed','loop', 'shadows', 'pagination']
                    }
                ]
            },
            {
                name: 'direction',
                label: 'Direction',
                type: 'select',
                def:'horizontal',
                choices: [{
                        label: 'Horizontal',
                        value: 'horizontal',
                    },
                    {
                        label: 'Vertical',
                        value: 'vertical',
                    }
                ]
            },
            {
                name: 'crossfade',
                type: 'boolean',
                label: 'Cross fade'
            }, 
            {
                name: 'limitRotation',
                type: 'boolean',
                label: 'Limit Rotation'

            },
            {
                name: 'pagination',
                type: 'boolean',
                label: 'Add pagination'

            },
            {
                name: 'navigation',
                type: 'boolean',
                label: 'Add Navigation'

            },
            {
                name: 'scollbar',
                type: 'boolean',
                label: 'Add Scroolbar'

            },
            {
                name: 'loop',
                type: 'boolean',
                label: 'Loop'

            },
            {
                name: 'autoplay',
                type: 'boolean',
                label: 'Auto play',
                choices: [{
                    value: true,
                    showFields: ['delay']
                }]
            },
            {
                name: 'delay',
                label: 'Delay between slides',
                type: 'range',
                min: 5,
                max: 30000,
                def: 2000,
                step: 20
            },
            {
                name: 'speed',
                label: 'Speed of transition between slides',
                type: 'range',
                min: 5,
                max: 30000,
                def: 2000,
                step: 20
            },
            {
                name: 'rotate',
                label: 'Rotate',
                type: 'range',
                def: -10,
                min: -90,
                max: 90,
                step: 1
            },
            {
                name: 'depth',
                label: 'Z Depth',
                type: 'range',
                def: 200,
                min: 50,
                max: 1000,
                step: 10
            },
            {
                name: 'stretch',
                label: 'Stretch',
                type: 'range',
                def: 0,
                min: 0,
                max: 50,
                step: 1
            },
            {
                name: 'modifier',
                label: 'Effect Multiplier',
                type: 'range',
                def: 0,
                min: 0,
                max: 6,
                step: 1
            },
            {
                name: 'slidesPerView',
                label: 'Slides Per View',
                type: 'range',
                min: 1,
                max: 10,
                def: 1,
                step: 1
            },
            {
                name: 'shadows',
                label: 'Shadows',
                type: 'boolean',
                def: false
            },
            {
                name: 'albumSwiper',
                label: 'Choose Image to Upload',
                // help : 'IMPORTANT : Aspect Ratio 1:1',
                type: 'singleton',
                widgetType: 'apostrophe-images',
                options: {
                    //   aspectRatio : [1,1],
                    //   minSize: [300, 300],
                    limit: [20],
                    focalPoint: true,
                    noHeight: true,
                    size: 'half'
                }
            },
            {
                name: 'textPlayer',
                label: 'Slides ',
                type: 'array',
                titleField: 'myname',
                contextual: false,
                schema: [{
                        type: 'area',
                        contextual: false,
                        options: {
                            widgets: {
                                'apostrophe-rich-text': {
                                    format_p: {
                                        element: 'p',
                                        attributes: {
                                            'class': 'normal-text'
                                        }
                                    },
                                    toolbar: ['Styles', 
                                    'Bold', 
                                    'Italic', 
                                    'Link', 
                                    'Table', 
                                    'BulletedList', 
                                    'Strike', 
                                    'Blockquote',
                                    'CodeBlock',
                                    'HardBreak',
                                    'Heading',
                                    'OrderedList',
                                    'BulletList',
                                    'ListItem',
                                    'TodoItem',
                                    'TodoList',
                                    'Bold',
                                    'Code',
                                    'Underline',
                                    'History'],
                                    styles: [{
                                            name: 'Normal',
                                            element: 'p'
                                        },
                                        {
                                            name: 'Section Heading',
                                            element: 'p',
                                            attributes: {
                                                'class': 'section-headings'
                                            }
                                        },
                                        {
                                            name: 'Sub-Heading',
                                            element: 'p',
                                            attributes: {
                                                'class': 'subheading'
                                            }
                                        },
                                        {
                                            name: 'Hero Title',
                                            element: 'p',
                                            attributes: {
                                                'class': 'hero__title'
                                            }
                                        },
                                        {
                                            name: 'Big Hero Title',
                                            element: 'p',
                                            attributes: {
                                                'class': 'hero__title--1'
                                            }
                                        },
                                        {
                                            name: 'Hero Sub-Title',
                                            element: 'p',
                                            attributes: {
                                                'class': 'hero__subtitle'
                                            }
                                        },
                                        {
                                            name: 'Hero Sub-Title Upper',
                                            element: 'p',
                                            attributes: {
                                                'class': 'hero__subtitle--1'
                                            }
                                        },
                                        {
                                            name: 'H1',
                                            element: 'h1'

                                        },
                                        {
                                            name: 'H2',
                                            element: 'h2'

                                        },
                                        {
                                            name: 'H3',
                                            element: 'h3'

                                        },
                                        {
                                            name: 'H4',
                                            element: 'h4'

                                        },
                                        {
                                            name: 'H5',
                                            element: 'h5'

                                        },
                                        {
                                            name: 'H6',
                                            element: 'h6'

                                        },
                                        {
                                            name: 'Normal Color Text',
                                            element: 'p',
                                            attributes: {
                                                'class': 'normal-text'
                                            }
                                        },
                                        {
                                            name: 'White Text',
                                            element: 'p',
                                            attributes: {
                                                'class': 'white-text'
                                            }
                                        },
                                        {
                                            name: 'Grey Text',
                                            element: 'p',
                                            attributes: {
                                                'class': 'grey-text'
                                            }
                                        },
                                        {
                                            name: 'Subheading Color Text',
                                            element: 'p',
                                            attributes: {
                                                'class': 'high-text'

                                            }
                                        },
                                        {
                                            name: 'Highlighter',
                                            element: 'p',
                                            attributes: {
                                                'class': 'highlight'
                                            }
                                        },
                                        {
                                            name: 'Outline',
                                            element: 'p',
                                            attributes: {
                                                'class': 'font-outline'
                                            }
                                        },
                                        {
                                            name: 'Deep Shadows',
                                            element: 'p',
                                            attributes: {
                                                'class': 'font-shadow-multiple'
                                            }
                                        },
                                        {
                                            name: '3D Float',
                                            element: 'p',
                                            attributes: {
                                                'class': 'font-3d-float'
                                            }
                                        },
                                        {
                                            name: '3D',
                                            element: 'p',
                                            attributes: {
                                                'class': 'font-3d'
                                            }
                                        },
                                        {
                                            name: 'Emboss',
                                            element: 'p',
                                            attributes: {
                                                'class': 'font-emboss'
                                            }
                                        }
                                    ],

                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'templateSections': {
                                    editLabel: 'Change Smart Section',
                                    limit: 1,
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'section': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'one-columns': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'two-columns': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'three-columns': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'one-columns': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'apostrophe-images': {
                                    size: 'full'
                                },


                                'spacer': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'apostrophe-link': {

                                    controls: {
                                        cloneable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },

                                // 'apostrophe-twitter': {
                                //     limit: 3,
                                //     controls: {
                                //         movable: true,
                                //         removable: true,
                                //         position: 'top-right'
                                //     }
                                // },
                              
                                'squarebox-gallery': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'ecom-product': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                               
                                'album-gallery': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                                'videos': {
                                    controls: {
                                        movable: true,
                                        removable: true,
                                        position: 'top-right'
                                    }
                                },
                            }
                        },
                        name: 'text',
                        label: 'Text'
                    },
                    {
                        name: 'myname',
                        label: 'Name',
                        type: 'string'
                    }

                ]
            }

        ].concat(options.addFields || []);

        //},
        options.arrangeFields = options.arrangeFields || [

            {
                name: 'brief',
                label: 'Settings',
                fields: ['albumName', ,'width','height','textPlayer', 'effect','direction','slidesPerView', 'rotate', 'limitRotation', 'depth', 'stretch', 'modifier', 'loop', 'autoplay', 'delay', 'speed','pagination', 'navigation','scrollbar','shadows', 'crossfade']
            },

        ];
    },
    construct: function (self, options) {

        self.pushAsset('stylesheet', 'albumWidget', {
            when: 'always'
        });
        self.pushAsset('script', 'initAlbum', {
            when: 'always'
        });
    }

};