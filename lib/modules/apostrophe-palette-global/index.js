module.exports = {
    improve: 'apostrophe-palette-global',

    paletteFields: [ // array of fields, like a normal schema
      {
        name: 'backgroundColor',
        label: 'Background color',
        type: 'color',
        selector: 'body',
        property: 'background-color',
      },
      {
        name: 'fontColor',
        label: 'Text Colour',
        type: 'color',
        selector: 'body',
        property: 'color',
      },
      {
        name: 'fontSpace',
        label: 'Text Spacing',
        type: 'range',
        selector: 'body',
        property: 'letter-spacing',
        min: 0.0,
        max: 0.5,
        step: 0.01,
        unit: 'rem',
      },
      {
        name: 'fontSpaceSmall',
        label: 'Mobile Text Spacing',
        type: 'range',
        selector: 'body',
        property: 'letter-spacing',
        min: 0.0,
        max: 0.5,
        step: 0.01,
        unit: 'rem',
        mediaQuery: '(max-width: 59.99em)'
      },
      {
        name: 'fontLineHeight',
        label: 'Text Line Height',
        type: 'range',
        selector: 'body',
        property: 'line-height',
        min: 0.0,
        max: 2.9,
        step: 0.01,
        unit: 'rem',
      },
      {
        name: 'fontLineHeightSmall',
        label: 'Mobile Text Line Height',
        type: 'range',
        selector: 'body',
        property: 'line-height',
        min: 0.0,
        max: 2.9,
        step: 0.01,
        unit: 'rem',
        mediaQuery: '(max-width: 59.99em)'
      },
          //
      {
        name: 'linkColor',
        label: 'Link Colour',
        type: 'color',
        selector: ['a'],
        property: ['color'],
      },
      {
        name: 'linkVisitColor',
        label: 'Link Visited Colour',
        type: 'color',
        selector: ['a:visited'],
        property: ['color'],
      },
      {
        name: 'linkHoverColor',
        label: 'Link Hover Colour',
        type: 'color',
        selector: ['a:hover'],
        property: ['color'],
      },
      {
        name: 'menuColor',
        label: 'Menu Colour',
        type: 'color',
        selector: '.xxnav',
        property: 'background-color',
      },
      {
        name: 'menuTextColor',
        label: 'Menu Text Colour',
        type: 'color',
        selector: '.xxnav-links .hover-underline-animation',
        property: 'color',
      },
      {
        name: 'menuTextHoverColor',
        label: 'Menu Hover Colour',
        type: 'color',
        selector: ['.xxnav-links', '.hover-underline-animation:hover', '.hover-underline-animation:after'],
        property: 'color',
      },
      {
        name: 'menuHoverAnimationColor',
        label: 'Menu Hover Animation Colour',
        type: 'color',
        selector: ['.xxnav-links', '.hover-underline-animation:after'],
        property: 'background-color',
      },
      {
        name: 'menuHoverAnimationBarHeight',
        label: 'Menu Hover Animation Colour',
        type: 'range',
        selector: ['.xxnav-links', '.hover-underline-animation:after'],
        property: 'background-color',
      },
      {
        name: 'menuOpacity',
        label: 'Menu Opacity',
        type: 'range',
        selector: '.xxnav',
        property: 'opacity',
        min: 0,
        max: 1,
        step: 0.1,
        unit: '',
        // mediaQuery: '(max-width: 59.99em)'
      },
      {
        name: 'headerColor',
        label: 'Headers Colour',
        type: 'color',
        selector: ['h1', 'h2', 'h3', 'h4', 'h5'],
        property: 'color',
      },
      {
        name: 'imageMargins',
        label: 'Vertical Margins',
        type: 'range',
        selector: '.apos-slideshow',
        property: ['margin-bottom', 'margin-top'],
        min: 0,
        max: 10,
        step: 0.1,
        unit: 'rem',
        mediaQuery: '(max-width: 59.99em)'
      },
      {
        name: 'imageMarginsSmall',
        label: 'Vertical Margins Mobile',
        type: 'range',
        selector: '.apos-slideshow',
        property: ['margin-bottom', 'margin-top'],
        min: 0,
        max: 10,
        step: 0.1,
        unit: 'rem',
       
      },
      {
        name: 'buttonMarginsSmall',
        label: 'Vertical Margins',
        type: 'range',
        selector: '.apos-slideshow',
        property: ['margin-bottom', 'margin-top'],
        min: 0,
        max: 10,
        step: 0.1,
        unit: 'rem',
        // mediaQuery: '(max-width: 59.99em)'
      }
      ,
      {
        name: 'buttonMarginsSmall',
        label: 'Vertical Margins',
        type: 'range',
        selector: '.apos-slideshow',
        property: ['margin-bottom', 'margin-top'],
        min: 0,
        max: 10,
        step: 0.1,
        unit: 'rem',
        // mediaQuery: '(max-width: 59.99em)'
      }
      ,
      {
        name: 'buttonColor',
        label: 'Button Color',
        type: 'color',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a.iconButton','.likes-box'],
        property: 'background-color',

      },
      {
        name: 'buttonTextColor',
        label: 'Button Text Color',
        type: 'color',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a.iconButton','.linkDescription'],
        property: 'color',

      },

      {
        name: 'buttonTextHoverColor',
        label: 'Button Text Hover Color',
        type: 'color',
        selector: ['button.submitContact:hover', 'form[data-apos-forms-form] button:hover','a.iconButton:hover','.linkDescription:hover'],
        property: 'color',

      },
      {
        name: 'buttonHoverColor',
        label: 'Button Hover Color',
        type: 'color',
        selector: ['button.submitContact:hover', 'form[data-apos-forms-form] button:hover','a.iconButton:hover','.likes-box:hover'],
        property: 'background-color',

      },
      {
        name: 'buttonBorderColor',
        label: 'Button Border Color',
        type: 'color',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a.iconButton','.likes-box'],
        property: 'border-color',

      },
      {
        name: 'buttonBorderHoverColor',
        label: 'Button Border Hover Color',
        type: 'color',
        selector: ['button.submitContact:hover', 'form[data-apos-forms-form] button:hover','a .iconButton:hover','.likes-box:hover'],
        property: 'border-color',

      },
      {
        name: 'buttonBorderRadius',
        label: 'Button Border Radius',
        type: 'color',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton','.likes-box'],
        type: 'range',
        property: ['border-radius'],
        min: 0,
        max: 50,
        step: 1,
        unit: 'px',

      },
      {
        name: 'buttonBorderWidth',
        label: 'Button Border Width',
        type: 'range',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton'],
        type: 'range',
        property: ['border-width'],
        min: 0,
        max: 20,
        step: 1,
        unit: 'px',

      },
      {
        name: 'buttonShadow',
        label: 'Button Shadow',
        type: 'color',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton','.likes-box'],
        property: 'box-shadow',
        valueTemplate: '0 0 7px 2px %VALUE%'
      }
      ,
      {
        name: 'buttonWidth',
        label: 'Button Width',
        type: 'range',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton'],
        property: ['width'],
        min: 0,
        max: 100,
        step: 1,
        unit: '%'
      },
      {
        name: 'buttonWidthSmall',
        label: 'Button Width Mobile',
        type: 'range',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton'],
        property: ['width'],
        min: 0,
        max: 100,
        step: 1,
        unit: '%',
        mediaQuery: '(max-width: 59.99em)'
      }
      ,
      {
        name: 'buttonPaddingV',
        label: 'Button Verticle Padding',
        type: 'range',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton:hover'],
        property: ['padding-top', 'padding-bottom'],
        min: 0,
        max: 50,
        step: 1,
        unit: 'px',
        mediaQuery: '(max-width: 59.99em)'
      },
      {
        name: 'buttonPaddingVSmall',
        label: 'Button Verticle Padding',
        type: 'range',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton'],
        property: ['padding-top', 'padding-bottom'],
        min: 0,
        max: 50,
        step: 1,
        unit: 'px',
      
      },
      {
        name: 'buttonPaddingH',
        label: 'Button Horizontal Padding',
        type: 'range',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton'],
        property: ['padding-left', 'padding-right'],
        min: 0,
        max: 150,
        step: 1,
        unit: 'px',
        mediaQuery: '(max-width: 59.99em)'
      }
      ,
      {
        name: 'buttonPaddingHSmall',
        label: 'Button Horizontal Padding',
        type: 'range',
        selector: ['button.submitContact', 'form[data-apos-forms-form] button','a .iconButton'],
        property: ['padding-left', 'padding-right'],
        min: 0,
        max: 150,
        step: 1,
        unit: 'px',
      },
      {
        name: 'formInputBorderColor',
        label: 'For Input Border Color',
        type: 'color',
        selector: ['form.contact-form input', 'form.contact-form textarea'],
        property: 'border-color',

      },
    ],
    arrangePaletteFields: [
      {
        name: 'font',
        label: 'Font',
        fields: ['fontColor', 'fontSpaceSmall','fontSpace','fontLineHeight','fontLineHeightSmall']
      },
      {
        name: 'link',
        label: 'Links',
        fields: ['linkColor','linkHoverColor','linkVisitColor']
      },
      {
        name: 'main',
        label: 'Commons',
        fields: ['backgroundColor']
      },
      {
        name: 'menu',
        label: 'Menu',
        fields: ['menuColor', 'menuTextColor','menuTextHoverColor','menuOpacity']
      }
      ,
      {
        name: 'headers',
        label: 'Headers',
        fields: ['headerColor']
      }
      ,
      {
        name: 'buttons',
        label: 'Buttons',
        fields: ['buttonColor', 'buttonTextColor', 'buttonTextHoverColor','buttonHoverColor','buttonBorderWidth','buttonBorderColor','buttonBorderRadius','buttonShadow','buttonWidthSmall','buttonWidth','buttonPaddingHSmall','buttonPaddingH','buttonPaddingV','buttonPaddingVSmall']
      }
    ]
  }