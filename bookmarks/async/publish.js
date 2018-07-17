const isBookmark = require('../sync/isBookmark')

module.exports = function (server) {
  return function publish ({ name, root }, callback) {
    const bookmark = {
      type: 'bookmark',
      root,
      name
    }
    if (isBookmark(bookmark)) server.publish(bookmark, callback)
    else {
      var errors = bookmark.errors.map(e => `${e.field}: ${e.message}`)
      callback(new Error(`${errors.join(', ')}`))
    }
  }
}
