module.exports = {
  session: {
    // If this still says `undefined`, set a real secret!
    secret: '37ed79436fb7d35f'
  },
  csrf: 
  {
    exceptions: ['/modules/comments-widgets/submit', '/modules/reviews-widgets/submit','/modules/likes/get-like']
  }
  
}
