// This configures the apostrophe-users module to add an admin-level
// group by default:

module.exports = {
  groups: [
    {
      title: 'guest',
      permissions: ['guest']
    },
    {
      title: 'editor',
      permissions: ['edit']
    },
    {
      title: 'admin',
      permissions: [ 'admin' ]
    }
  ]
}
