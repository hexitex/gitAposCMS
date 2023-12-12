module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Spacer',
  addFields: [
    {
      name: 'space',
      label: 'Space Value (px)',
      type: 'integer',
      help: 'P/s :You will see a border on design. Don\'t worry, It will not affect on live website !',
      def: 10
    },
    {
      name: 'backgroundColor',
      type: 'color',
      label: 'Background Color ?',
      help: 'Don\'t worry , it wouldn\'t show in live mode'
    },
    {
      name: 'borderColor',
      type: 'color',
      label: 'Border Color ?',
      help: 'Don\'t worry , it wouldn\'t show in live mode'
    }
  ]
}
